const express = require('express');
const { ethers } = require('ethers');
const { Wormhole, evm, solana, algorand } = require("@wormhole-foundation/sdk");
// Add any other imports from your original script here.

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Token Bridge Route
app.post('/token-bridge', async (req, res) => {
  // Extract data from the request body as needed
  const { network, srcChainName, dstChainName, senderPrivateKey, senderAddress, recipientAddress, tokenId, amount: amountStr } = req.body;
  
  try {
    // Initialize Wormhole and other setup based on request data
    // Similar to your `main` function logic but adapted to use request data
    const wh = new Wormhole(network, [evm.Platform, solana.Platform, algorand.Platform]);
    const srcChain = wh.getChain(srcChainName);
    const dstChain = wh.getChain(dstChainName);

    const senderChainAddress = Wormhole.chainAddress(srcChainName, senderAddress);
    const recipientChainAddress = Wormhole.chainAddress(dstChainName, recipientAddress);

    const token = Wormhole.tokenId(srcChainName, tokenId);
    const amount = ethers.utils.parseUnits(amountStr, srcChain.config.nativeTokenDecimals);
    
    // Proceed with token transfer logic as in your `main` function
    // Remember to handle asynchronous operations with await and try-catch for error handling

    res.status(200).json({ message: "Token transfer initiated successfully." });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred during the token transfer." });
  }
});

app.listen(port, () => {
  console.log(`Token Bridge API listening at http://localhost:${port}`);
});