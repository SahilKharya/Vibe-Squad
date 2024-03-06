import SocialBlade from 'socialblade';
import { ethers } from "ethers";

import { AddUserDTO, UpdateUserDTO, RankingUserDTO } from '../dtos/users'
import userRepository from '../repositories/user.repository'
import contractAbi from '../../contracts/artifacts/SkyriseCashback-abi.json';

const sbClient: SocialBlade = new SocialBlade(
  Bun.env.SOCIALBLADE_CLIENT_ID?Bun.env.SOCIALBLADE_CLIENT_ID:'',
  Bun.env.SOCIALBLADE_ACCESS_TOKEN?Bun.env.SOCIALBLADE_ACCESS_TOKEN:''
);
const BASE_SEPOLIA_RPC = 'https://sepolia.base.org'

export async function checkRanking(socialData: RankingUserDTO) {
  let ranking: number = 0;
  console.log('socialData:', socialData);
  console.log('Checking Social Data for @' + socialData.social.username + ' on ' + socialData.social.platform + '\n');
  try {
    let sbUser: any = {};
    if (socialData.social.platform === 'twitter') {
      sbUser = await sbClient.twitter.user(socialData.social.username);
    } else if (socialData.social.platform === 'youtube') {
      sbUser = await sbClient.youtube.user(socialData.social.username);
    } else if (socialData.social.platform === 'instagram') {
      sbUser = await sbClient.instagram.user(socialData.social.username);
    } else {
      console.log(socialData.social.platform, 'is currently not supported!');
    }
    console.log('sbUser:', sbUser);
    ranking = sbUser.ranks.sbrank;

    // check if user exists
    let checkUser = await findAll({
      account: socialData.address
    })
    console.log('checkUser:', checkUser);
    if (!checkUser) {
      let socialUserData: any = {};
      socialUserData[socialData.social.platform] = {
        username: socialData.social.username,
        data: sbUser
      };
      // create user
      userRepository.add({
        username: socialData.address,
        account: socialData.address,
        social: socialUserData
      });
    }
  } catch (error) {
    console.log('error:', error);
  }
  return ranking;
}

export async function calculateDiscount(ranking: number) {
  let discount = 0;
  if (ranking > 0 && ranking < 10) {
    discount = 1;
  } else if (ranking > 10 && ranking < 100) {
    discount = 2;
  } else if (ranking > 100 && ranking < 1000) {
    discount = 5;
  } else if (ranking > 1000 && ranking < 10000) {
    discount = 10;
  } else if (ranking > 10000 && ranking < 100000) {
    discount = 20;
  } else if (ranking > 100000 && ranking < 1000000) {
    discount = 50;
  } else if (ranking > 1000000) {
    discount = 75;
  }
  return discount;
}

export async function findAll(query: any) {
  return await userRepository.findAll(query)
}

export async function findOne(id: number) {
  return userRepository.findById(id)
}

export async function add(data: AddUserDTO) {
  return userRepository.add(data)
}

export async function remove(id: number) {
  return (await findOne(id)) ? await userRepository.removeById(id) : null
}

export async function update(id: number, data: UpdateUserDTO) {
  return (await findOne(id))
    ? await userRepository.updateById(id, data)
    : null
}

export async function newCashbackUser(userAccount: string) {
  // const user = await userRepository.findAll({
  //   account: userAccount
  // })
  // console.log('user:', user);
  // ethersjs setUse(userAccount)
  const contractAddress: string = Bun.env.SKYRISE_CASHBACK_CONTRACT_BASE_SEPOLIA || '';

  const privateKey = Bun.env.PRIVATE_KEY || '';
  const wallet = await new ethers.Wallet(privateKey);
  const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC)
  const walletClient = await wallet.connect(provider);

  const contractSigner = new ethers.Contract(
    contractAddress,
    contractAbi,
    walletClient
  )

  const tx = await contractSigner.newUser(userAccount);
  // Wait for Transaction Receipt
  const txData = await tx.wait();
  console.log('txData:', txData);
  return;
}
