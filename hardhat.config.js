require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
//localhost
// module.exports = {
//   solidity: "0.8.24",
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545",
//     },
//   },
// };

module.exports = {
  defaultNetwork: "polygon_amoy",
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 80002,
    },
    polygon_amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/FbVL2i2loSp-ZDdf5HWnur4UzvNzhhx8",
      accounts: [
        `0x${"32642c1cc73937c70cdf7e730330f94d1ad5a10c8e8ad3a78c3efe1e2ae84a88"}`,
      ],
    },
  },
  // compilers: [
  //   {
  //     version: "0.8.4", // Primary version, can be adjusted based on your needs
  //     settings: {
  //       optimizer: {
  //         enabled: true,
  //         runs: 200,
  //       },
  //     },
  //   },
  // ],
};
