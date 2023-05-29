require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    networks: {
        testnet: {
            url: process.env.URL,
            accounts: [process.env.ACCOUNTS],
        },
    },
};

// BikeChain deployed to: 0xbfB0eAB0C81cC999111ce7919a478Df58ff22020
