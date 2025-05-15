'use client';

import { useConnectWallet } from "@web3-onboard/react"
import { createContext, useCallback, useContext, useState } from "react"
import { createWalletClient, custom } from "viem"

type Web3ContextValues = {
  signIn: () => Promise<{ success: boolean; error?: Error }>
  signOut: () => Promise<{
    success: boolean
    error?: Error
  }>
  isConnected: boolean
  connecting: boolean
  authenticatedAddress?: string
  chainId?: number
}

const Web3Context = createContext<Web3ContextValues | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [{ wallet, connecting: onboardConnecting }, connect, disconnect] =
    useConnectWallet()

  const [isProcessing, setIsProcessing] = useState(false)

  const handleSignOut = useCallback(async (): Promise<{
    success: boolean
    error?: Error
  }> => {
    try {
      await disconnect({ label: wallet?.label ?? "" })
      return { success: true }
    } catch (error) {
      console.error("Error during wallet sign-out:", error)
      return {
        success: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      }
    }
  }, [disconnect, wallet])

  const handleSignIn = useCallback(async (): Promise<{
    success: boolean
    error?: Error
  }> => {
    if (isProcessing)
      return { success: false, error: new Error("Already processing") }
    setIsProcessing(true)

    try {
      const wallets = await connect()

      const client = createWalletClient({
        transport: custom(wallets[0].provider),
      })
      const accounts = await client.getAddresses()

      const account = accounts[0]
      if (!account) throw new Error("No wallet connected.")

      return { success: true }
    } catch (error) {
      if (wallet?.label) {
        await disconnect({ label: wallet.label })
      }
      console.error("Error during connect and validate:", error)
      return {
        success: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      }
    } finally {
      setIsProcessing(false)
    }
  }, [connect, isProcessing, disconnect])

  return (
    <Web3Context.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        isConnected: Boolean(wallet?.accounts?.[0]?.address),
        connecting: onboardConnecting || isProcessing,
        authenticatedAddress: wallet?.accounts?.[0]?.address,
        chainId: wallet?.chains?.[0]?.id
          ? Number.parseInt(wallet.chains[0].id, 16)
          : undefined,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error(
      'The "useWeb3()" hook must be used within a <Web3Provider /> component.',
    )
  }
  return context
}
