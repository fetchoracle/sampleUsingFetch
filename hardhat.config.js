require("@nomiclabs/hardhat-ethers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    pulsev3: {
      chainId: 942,
      url: "https://rpc.v3.testnet.pulsechain.com",
      accounts: ['838eae79f0ec221bd01270bc8653a1d7c4732cf752e4012af88ddb5c68217e11'],
      // @see https://www.hexpulse.info/docs/hardhat-development.html#configure-hardhat-for-testnet
      gasPrice: 5e10
      // gasMultiplier: 1.75
    },
  }
};
