const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  await nftMarketplace.deployed();

  //transfer fund
  const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
  const transferFunds = await TransferFunds.deploy();

  await transferFunds.deployed();

  console.log(`Deployed contract Address ${nftMarketplace.address}`);
  console.log(
    `Deployed transferFunds contract Address ${transferFunds.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
