
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/wBMRGbih2rThBtRuF8Z9-jQFlKvZ0qvh',
      accounts: ['40260a698cb13ebe835a2ba075194958920f8993fc896e1eb2edc0e56fe73750']
    },
  }
};
