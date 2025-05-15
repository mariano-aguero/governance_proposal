'use client';

import { useWeb3 } from "@/providers/web3Provider"
import { useCallback } from "react"
import { useRouter } from 'next/navigation'

export default function SignInButton() {
  const { signIn, signOut, isConnected, connecting } = useWeb3()
  const router = useRouter();

  const handleButtonClick = useCallback(async () => {
    if (isConnected) {
      signOut()
    } else {
      const result = await signIn()

      if (result.success) {
        router.push('/create');
      } else {
        // throw an error
        console.error(result.error)
      }
    }
  }, [signIn, signOut, isConnected, ])

  return (
    <button
      disabled={connecting}
      onClick={handleButtonClick}
      style={{
        fontSize: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        opacity: connecting ? 0.6 : 1,
      }}
    >
      {connecting ? "Connecting..." : isConnected ? "Sign-out" : "Sign-in"}
    </button>

  )
}
