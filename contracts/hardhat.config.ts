import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const accounts = process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    mainnet: {
      url: process.env.WEB3_PROVIDER_URL || 'https://mainnet.infura.io/v3/YOUR_API_KEY',
      chainId: 1,
      accounts,
    },
    sepolia: {
      url: process.env.WEB3_PROVIDER_URL || 'https://sepolia.infura.io/v3/' + process.env.ETHERSCAN_API_KEY,
      chainId: 11155111,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY as string,
    }
  },
};

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

export default config;
