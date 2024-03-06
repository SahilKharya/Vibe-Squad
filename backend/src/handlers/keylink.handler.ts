import { ethers } from "ethers";
import { AddKeylinkDTO } from '../dtos/keylinks'
import keylinkRepository from '../repositories/keylink.repository'
// import userRepository from '../repositories/user.repository'
import contractAbi from '../../contracts/artifacts/Skyrise-abi.json';

const BASE_SEPOLIA_RPC = 'https://sepolia.base.org'

export async function findAll(query: any) {
  return await keylinkRepository.findAll(query)
}

export async function findOne(id: number) {
  return keylinkRepository.findById(id)
}

export async function add(data: AddKeylinkDTO) {
  return keylinkRepository.add(data)
}

export async function remove(id: number) {
  return (await findOne(id)) ? await keylinkRepository.removeById(id) : null
}

export async function markUse(userAccount: string) {
  // const user = await userRepository.findAll({
  //   account: userAccount
  // })
  // console.log('user:', user);
  // ethersjs setUse(userAccount)
  const contractAddress: string = Bun.env.SKYRISE_CONTRACT_BASE_SEPOLIA || '';

  const privateKey = Bun.env.PRIVATE_KEY || '';
  const wallet = await new ethers.Wallet(privateKey);
  const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC)
  const walletClient = await wallet.connect(provider);

  const contractSigner = new ethers.Contract(
    contractAddress,
    contractAbi,
    walletClient
  )

  const tx = await contractSigner.setUse(userAccount);
  // Wait for Transaction Receipt
  const txData = await tx.wait();
  console.log('txData:', txData);
  // TODO: micropayment on each impression
  return;
}

export async function participate(userAccount: string, key: string) {
  // const user = await userRepository.findAll({
  //   account: userAccount
  // })
  // console.log('user:', user);
  // ethersjs setUse(userAccount)
  const contractAddress: string = Bun.env.SKYRISE_CONTRACT_BASE_SEPOLIA || '';

  const privateKey = Bun.env.PRIVATE_KEY || '';
  const wallet = await new ethers.Wallet(privateKey);
  const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC)
  const walletClient = await wallet.connect(provider);

  const contractSigner = new ethers.Contract(
    contractAddress,
    contractAbi,
    walletClient
  )

  const tx = await contractSigner.participate(userAccount, key);
  // Wait for Transaction Receipt
  const txData = await tx.wait();
  console.log('txData:', txData);
  // TODO: micropayment on each impression
  return;
}
