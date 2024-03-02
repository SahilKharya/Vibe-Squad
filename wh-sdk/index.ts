// index.ts
import { ChainAddress, TokenId, Wormhole } from "@wormhole-foundation/sdk";
import { ethers } from 'ethers';
import { evm } from "@wormhole-foundation/sdk/evm";
import { solana } from "@wormhole-foundation/sdk/solana";
import { algorand } from "@wormhole-foundation/sdk/algorand";

// import { base } from "@wormhole-foundation/sdk/base";

async function main() {
  const network = "Testnet"; // Or "Testnet"
  const wh = new Wormhole(network, [evm.Platform, solana.Platform, algorand.Platform]);

  // Get a ChainContext object for a specific chain
  const srcChain = wh.getChain("Sepolia");
  const dstChain = wh.getChain("BaseSepolia");
  const addr = "0xEc88FBCeDD974577EDEB4AA1C42FA624485Df0D8"
  const p_key = "4cb10dac7d4815379f6d2eb54ad9b11a747423c79a0a0934111fad2a2abed14d"
  const senderAddress: ChainAddress = Wormhole.chainAddress("Sepolia",addr);
  const recAddress: ChainAddress = Wormhole.chainAddress("BaseSepolia",addr);

  const strAddress = Wormhole.canonicalAddress(senderAddress); // => '0xbeef...'

  try {
    // In this SDK, the string literal 'native' is an alias for the gas token native to the chain
    const balance = await srcChain.getBalance(addr, "native"); // => BigInt
    console.log(`Balance: ${balance}`);
    
    
    const token: TokenId = Wormhole.tokenId("Sepolia","0x517f2982701695D4E52f1ECFBEf3ba31Df470161");
    
    // Format it for base units
    const amount = ethers.parseUnits("0.01", srcChain.config.nativeTokenDecimals)
    // Create a TokenTransfer object, allowing us to shepherd the transfer through the process and get updates on its status
    const manualXfer = await wh.tokenTransfer(
        token, // TokenId of the token to transfer or 'native'
        amount, // Amount in base units
        senderAddress, // Sender address on source chain
        recAddress, // Recipient address on destination chain
        false
    );
    const signer = await evm.getEvmSignerForKey(await srcChain.getRpc(), p_key);
    const dstSigner = await evm.getEvmSignerForKey(await dstChain.getRpc(), p_key);
    // 1) Submit the transactions to the source chain, passing a signer to sign any txns
    const srcTxids = await manualXfer.initiateTransfer(signer);
    
    // 2) Wait for the VAA to be signed and ready (not required for auto transfer)
    // Note: Depending on chain finality, this timeout may need to be increased.
    // See https://docs.wormhole.com/wormhole/reference/constants#consistency-levels for more info on specific chain finality.
    const timeout = 22*60_000;
    const attestIds = await manualXfer.fetchAttestation(timeout);
    console.log(`attestIds : ${attestIds}`);
    
    // 3) Redeem the VAA on the destination chain
    const destTxids = await manualXfer.completeTransfer(dstSigner);
    console.log(`destTxids : ${destTxids}`);

} catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch(console.error);