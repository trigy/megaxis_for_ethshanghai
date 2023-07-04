require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');
require('solidity-coverage');
require('hardhat-gas-reporter');
require('hardhat-contract-sizer');
require('dotenv').config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const ARBITRUM_GOERLI_RPC_URL = process.env.ARBITRUM_GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const CELO_ALF_RPC_URL = process.env.CELO_ALF_RPC_URL;
const CELO_ALF_API_KEY = process.env.CELO_ALF_API_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{ version: '0.8.17' }],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 5,
      gasPrice: 10000000000,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      blockConfirmations: 5,
    },
    arbitrumGoerli: {
      url: ARBITRUM_GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 421613,
      blockConfirmations: 5,
    },
    celoAlf: {
      url: CELO_ALF_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 44787,
      blockConfirmations: 5,
      url: "https://alfajores-forno.celo-testnet.org",
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      mumbai: POLYGONSCAN_API_KEY,
      arbitrumGoerli: ARBISCAN_API_KEY,
      celoAlf: CELO_ALF_API_KEY,
    },
    customChains: [
      {
        network: 'goerli',
        chainId: 5,
        urls: {
          apiURL: 'https://api-goerli.etherscan.io/api',
          browserURL: 'https://goerli.etherscan.io',
        },
      },
      {
        network: 'celoAlf',
        chainId: 44787,
        urls: {
          apiURL: 'https://api-mumbai.polygonscan.com/api',
          browserURL: 'https://mumbai.polygonscan.com',
        },
      },
      {
        network: 'mumbai',
        chainId: 80001,
        urls: {
          apiURL: 'https://api-mumbai.polygonscan.com/api',
          browserURL: 'https://alfajores.celoscan.io/',
        },
      },
    ],
  },
  gasReporter: {
    enabled: false,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  mocha: {
    timeout: 300000,
  },
};
