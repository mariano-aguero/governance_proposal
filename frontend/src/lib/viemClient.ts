'use client';

import { createWalletClient, custom , createPublicClient, http} from 'viem';
import { sepolia } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})

export const walletClient = (() => {
  if (!window.ethereum) {
    console.log('Ethereum provider not found. Please install MetaMask.');
    return null;
  }

  return createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });
})();

