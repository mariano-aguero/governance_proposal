'use client';

import { useWeb3 } from '@/providers/web3Provider';

export function ConnectButton() {
  const { isConnected, authenticatedAddress, connecting, signIn } = useWeb3();

  const handleClick = async () => {
    if (!isConnected) {
      await signIn();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        opacity: connecting ? 0.6 : 1,
      }}
    >
      {isConnected && authenticatedAddress
        ? `${authenticatedAddress.slice(0, 6)}...${authenticatedAddress.slice(-4)}`
        : connecting
          ? 'Connecting...'
          : 'Connect Wallet'}
    </button>
  );
}
