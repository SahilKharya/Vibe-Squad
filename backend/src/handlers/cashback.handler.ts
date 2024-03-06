import { ethers } from "ethers";

import { AddCashbackDTO, UpdateCashbackDTO } from '../dtos/cashbacks'
import cashbackRepository from '../repositories/cashback.repository'
import userRepository from '../repositories/user.repository'
import contractAbi from '../../contracts/artifacts/SkyriseCashback-abi.json';

const BASE_SEPOLIA_RPC = 'https://sepolia.base.org'

export async function findAll(query: any) {
  return await cashbackRepository.findAll(query)
}

export async function findOne(id: number) {
  return cashbackRepository.findById(id)
}

export async function add(data: AddCashbackDTO) {
  return cashbackRepository.add(data)
}

export async function remove(id: number) {
  return (await findOne(id)) ? await cashbackRepository.removeById(id) : null
}

export async function update(id: number, data: UpdateCashbackDTO) {
  return (await findOne(id))
    ? await cashbackRepository.updateById(id, data)
    : null
}

export async function recordCashback(userId: number, amount: number) {
  const user = await userRepository.findById(userId)
  console.log('user:', user);

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

  const amountInWei = amount * 10 ** 18;
  const tx = await contractSigner.elligibleCashback(user?.account, amountInWei);
  // Wait for Transaction Receipt
  const txData = await tx.wait();
  console.log('txData:', txData);
  return;
}

export async function payout(userId: number, amount: number) {
  const user = await userRepository.findById(userId)
  console.log('user:', user);

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

  const amountInWei = amount * 10 ** 18;
  const tx = await contractSigner.payout(user?.account, amountInWei);
  // Wait for Transaction Receipt
  const txData = await tx.wait();
  console.log('txData:', txData);
  return;
}
