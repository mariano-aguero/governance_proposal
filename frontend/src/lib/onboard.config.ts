import injectedModule from "@web3-onboard/injected-wallets"
import ledgerModule from "@web3-onboard/ledger"
import metamaskSDK from "@web3-onboard/metamask"
import walletConnectModule from "@web3-onboard/walletconnect"
import { sepolia } from "viem/chains"

const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ""
const DAPP_NAME = "Governance proposal"

const wallets = [
  injectedModule(),
  metamaskSDK({
    options: {
      extensionOnly: false,
      dappMetadata: {
        name: DAPP_NAME,
      },
    },
  }),
  ledgerModule({
    walletConnectVersion: 2,
    projectId: WALLET_CONNECT_ID,
  }),
  walletConnectModule({
    projectId: WALLET_CONNECT_ID,
    dappUrl: "http://localhost:3000",
  }),
]

const chains = [
  {
    id: sepolia.id,
    token: "ETH",
    label: "Sepolia Testnet",
    rpcUrl: 'https://rpc.sepolia.org',
  }
]

export const onboardConfig = {
  wallets,
  chains,
  appMetadata: {
    name: DAPP_NAME,
    description: "Governance proposal for educational purposes",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
  connect: {
    autoConnectLastWallet: true,
  },
}
