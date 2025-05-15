# Governance Frontend

A decentralized application (dApp) frontend for managing governance proposals, connecting Web3 wallets, and interacting with on-chain data.

---

## 🧱 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [wagmi](https://wagmi.sh/)
- [viem](https://viem.sh/)
- [web3-onboard](https://onboard.blocknative.com/)
- [Alchemy](https://www.alchemy.com/)

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/mariano-aguero/governance_proposal.git
cd your-repo
```
2. **Install dependencies**

```bash
npm install
# or
yarn
# or
pnpm install
```
3. **Set up environment variables**

Create a .env.local file in the root directory and fill in the required values:
```
NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS=0xc7e78A83EbF3f4aEb6e713e6556A04Eb1c360BEb
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-api-key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-walletconnect-project-id
```


4. **Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 to view the app in your browser.


---

## 📦 Available Scripts

| Command          | Description                              |
|------------------|------------------------------------------|
| `npm run dev`    | Start the development server             |
| `npm run build`  | Build the app for production             |
| `npm run start`  | Start the production build               |
| `npm run lint`   | Run ESLint using Next.js configuration  |

---

## 🧪 Prerequisites

- Node.js `>=18`
- Alchemy API key ([get one here](https://www.alchemy.com/))
- WalletConnect Project ID ([create one here](https://cloud.walletconnect.com/))
- Browser wallet (e.g., MetaMask)

---

## 🧩 Project Structure
```aiignore
├── public/ # Static assets
├── src/
│ ├── components/ # UI components
│ ├── hooks/ # Custom hooks (e.g. proposals, web3)
│ ├── pages/ # Next.js routes
│ └── utils/ # Helper functions
├── .env.local # Environment variables
├── package.json
└── README.md
```


---

## 🛠️ Key Features

- Web3 wallet support: MetaMask, WalletConnect, Ledger, and more
- Fetching proposals from the blockchain
- Creating new proposals on-chain
- State and data management with React Query

---

## 📋 TODO

- [ ] EIP-712 message signing
- [ ] Proposal voting system
- [ ] Multi-network support (Optimism, Arbitrum, etc.)

---

