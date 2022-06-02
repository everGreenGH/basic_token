const { alchemyApiKey, etherscanApiKey, privateKey } = require('./secrets.json');

require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-etherscan');
 
 
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
}); 
 
module.exports = {
  solidity: {
    version: "0.8.4",
  }, 
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      chainId: 4, 
      accounts: [privateKey]
    },
  },
  etherscan: {
    apiKey: etherscanApiKey
  }
};