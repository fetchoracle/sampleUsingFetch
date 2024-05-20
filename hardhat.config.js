require("@nomiclabs/hardhat-ethers");
const dotenv = require("dotenv");
dotenv.config();
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.20",
  networks: {
    pulsev4: {
      chainId: 943,
      url: "https://rpc.v4.testnet.pulsechain.com",
      accounts: [process.env.PRIVATE_KEY],
      // @see https://www.hexpulse.info/docs/hardhat-development.html#configure-hardhat-for-testnet
      gasPrice: 5e10
      // gasMultiplier: 1.75
    },
    mainnet: {
      chainId: 369,
      url: "https://rpc.pulsechain.com",
      accounts: [process.env.PRIVATE_KEY],
      // @see https://www.hexpulse.info/docs/hardhat-development.html#configure-hardhat-for-testnet
      gasPrice: 5e20
      // gasMultiplier: 1.75
    },    
  }
};
