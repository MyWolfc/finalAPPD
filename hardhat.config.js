require('dotenv').config();
require('@nomiclabs/hardhat-ethers')
const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork:'sepolia',
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/LARJvo_OjO0VB4jkVmAmSEnzwW5m-yC0',
      accounts:[`0x195b7067179fbe66835009b3800bbec93d42b8c794e53525b4bf4c0aed96afab`]
    }
  }
};