require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify")
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox/network-helpers")


const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const AVALANCHE_URL = process.env.AVALANCHE_URL;
const FUJI_URL = process.env.FUJI_URL;
const CMC_KEY = process.env.CMC_KEY;
const SNOWTRACE_KEY = process.env.SNOWTRACE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
  },

  constructorArgs: [
    "0x33f8c22E251310785A39461CD78c7671B7d9e274"
  ],
  networks: {

    fuji: {
      url: FUJI_URL,
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [WALLET_PRIVATE_KEY],
    },

    mainnet: {
      url: AVALANCHE_URL,
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [WALLET_PRIVATE_KEY],
    },


  },

  etherscan: {
    apiKey: {
      avalancheFujiTestnet: SNOWTRACE_KEY
    }
  },


  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "AVAX",
    coinmarketcap: CMC_KEY
  },
  sourcify: {
    enabled: true
  }


};
