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
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/FbVL2i2loSp-ZDdf5HWnur4UzvNzhhx8",
      accounts: [
        `0x${"32642c1cc73937c70cdf7e730330f94d1ad5a10c8e8ad3a78c3efe1e2ae84a88"}`,
      ],
    },
    localhost: {
      hardhat: {
        url: "http://127.0.0.1:8545",
        accounts: [
          "d1740eb356ec4794c793b8c32258e1fbc5f7165d690cdbc831eea72a427d4683",
        ],
      },
    },
  },
};
