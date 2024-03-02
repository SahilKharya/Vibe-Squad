//Private_key= "4cb10dac7d4815379f6d2eb54ad9b11a747423c79a0a0934111fad2a2abed14d"
//tbtc_base="0xb8f31A249bcb45267d06b9E51252c4793B917Cd0"
//tbtc_sepolia="0x517f2982701695D4E52f1ECFBEf3ba31Df470161"
//tbtc_eth="0x18084fbA666a33d37592fA2633fD49a74DD93a88"


import * as ethers from "ethers"
import { TBTC } from "@keep-network/tbtc-v2.ts"

// Create an Ethers provider. Pass the URL of an Ethereum mainnet node.
// For example, Alchemy or Infura.
const provider = new ethers.providers.JsonRpcProvider("https://cool-blissful-lake.ethereum-sepolia.quiknode.pro/de65ae9a862cf1b7e187d89b02875ebda114a10f/")
// Create an Ethers signer. Pass the private key and the above provider.
console.log(process.env.Private_key)
const signer = new ethers.Wallet(process.env.Private_key, provider)

// If you want to initialize the SDK just for read-only actions, it is
// enough to pass the provider. 
const sdkReadonly = await TBTC.initializeSepolia(provider)
// If you want to make transactions as well, you have to pass the signer.
const sdk = await TBTC.initializeSepolia(signer)


// Initialized SDK.
// Set the P2WPKH/P2PKH Bitcoin recovery address. It can be used to recover
// deposited BTC in case something exceptional happens.
const bitcoinRecoveryAddress: string = "..."

// Initiate the deposit.
const deposit = await sdk.deposits.initiateDeposit(bitcoinRecoveryAddress)

// Take the Bitcoin deposit address. BTC must be sent here.
const bitcoinDepositAddress = await deposit.getBitcoinAddress()

const txHash = await deposit.initiateMinting()
