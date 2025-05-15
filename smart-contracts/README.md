# Governance Proposal Smart Contract

This project contains the codebase and configuration to manage a simple governance proposal contract. Below are the instructions for setting up the environment, running the scripts, and deploying the contract.

---

## Important

Contract already deployed on Sepolia test network. Address: 0xc7e78A83EbF3f4aEb6e713e6556A04Eb1c360BEb.


## Prerequisites

1. **Install Node.js**:
    - Ensure you have [Node.js](https://nodejs.org/) installed (preferably the latest stable version).

2. **Install Project Dependencies**:
    - Run the following command in the root folder of the project to install the required dependencies:
      ```bash
      npm install
      ```

3. **Create an `.env` File**:
    - Set your environment variables to configure Hardhat for deployment. Add a file named `.env` in the root directory with the following details:
      ```env
      ALCHEMY_API_KEY=<ALCHEMY_API_KEY>
      PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
      ```
    - Replace `<ALCHEMY_API_KEY>` with your Alchemy project ID and `<YOUR_WALLET_PRIVATE_KEY>` with the private key of the wallet you want to use for deployments.

4. **Hardhat Configuration**:
    - The project is configured to interact with the **Sepolia test network**. Make sure your RPC URL and private key are properly set in the `.env` file.

---

## Available Scripts

### Linting
1. **Lint the Code**:
    - Run the following command to check code quality:
      ```bash
      npm run lint
      ```

2. **Fix Linting Errors**:
    - Use this command to automatically fix linting issues where possible:
      ```bash
      npm run lint:fix
      ```

---

### Compile the Contracts
1. **Compile the Smart Contracts**:
    - Run the following command to compile your Solidity contracts:
      ```bash
      npm run compile
      ```

    - Output files are located in the `artifacts/` and `cache/` directories and include the contract ABI and bytecode.

---

### Deploy the Contracts
1. **Deploy to Sepolia Network**:
    - Use the following command to deploy contracts to the Sepolia test network:
      ```bash
      npm run deploy
      ```

    - This script uses the `scripts/deploy.ts` file to deploy the smart contract. Ensure that the deploy script is properly configured to handle deployment logic, such as specifying the correct contract and constructor arguments.

2. **Custom Deployment Network**:
    - To deploy to another network, update the Hardhat configuration (e.g., `hardhat.config.ts`) and pass the desired network name instead of `sepolia`.

---

### Run Tests
1. **Run Smart Contract Tests**:
    - To ensure everything works as expected, execute the tests included in the `test/` folder:
      ```bash
      npm run test
      ```

    - Make sure to add sufficient test cases to cover all possible scenarios for your governance proposal.

---

### Project Structure

The main folders/files in this project include:

- `/contracts`: Contains the Solidity smart contracts.
- `/scripts`: Scripts for deploying and interacting with smart contracts.
- `/test`: Contains unit tests for the Solidity contracts.
- `hardhat.config.ts`: Hardhat configuration file to manage networks, Solidity compilers, and plugins.

---

## Troubleshooting

1. **Deployment Issues**:
    - Ensure you set the correct RPC node URL and private key in the `.env` file.
    - Verify that your wallet has sufficient test ETH for gas fees on the Sepolia network.

2. **Compilation Errors**:
    - Check the Solidity version in both your `hardhat.config.ts` and the `pragma` directive in your contracts.

3. **Testing Errors**:
    - Ensure all testing dependencies are properly installed by running `npm install`.

---

## Additional Details

### Dependencies
- [Hardhat](https://hardhat.org/): A development framework for Ethereum smart contracts.
- [dotenv](https://www.npmjs.com/package/dotenv): To load environment variables from `.env` files.
- [Hardhat Toolbox](https://hardhat.org/plugins/hardhat-toolbox.html): Provides a suite of tools for testing, debugging, and deploying.

---

## Notes

Please remember to **NEVER** hardcode sensitive information, such as private keys or RPC credentials, directly in your scripts or configuration files. Use `.env` files or another secure mechanism for managing secrets.

---

Feel free to reach out if you need assistance or have questions.
