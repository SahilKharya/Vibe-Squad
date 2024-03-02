// index.ts
import { Wormhole } from "@wormhole-foundation/sdk";
import { evm } from "@wormhole-foundation/sdk/evm";
import { solana } from "@wormhole-foundation/sdk/solana";
import { algorand } from "@wormhole-foundation/sdk/algorand";

async function main() {
  const network = "Testnet"; // Or "Testnet"
  const wh = new Wormhole(network, [evm.Platform, solana.Platform, algorand.Platform]);

  // Get a ChainContext object for a specific chain
  const srcChain = wh.getChain("Sepolia");

  try {
    // In this SDK, the string literal 'native' is an alias for the gas token native to the chain
    const balance = await srcChain.getBalance("0x8C0F4ee9EB7932882a17cF8333ffB9DED30d1657", "native"); // => BigInt
    console.log(`Balance: ${balance}`);

    // Returns a TokenBridge client for `srcChain`
    const tokenBridge = await srcChain.getTokenBridge(); // => TokenBridge<'Evm'>
    console.log(tokenBridge);

    // Util to grab an RPC client, cached after the first call
    const rpc = srcChain.getRpc(); // => RpcConnection<'Evm'>
    console.log(rpc);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch(console.error);