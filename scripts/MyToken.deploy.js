const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const MyTokenContract = await hre.ethers.getContractFactory("MyToken");
  const myTokenContract = await MyTokenContract.deploy();

  await myTokenContract.deployed();

  console.log("Your deployed contract address:", myTokenContract.address);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });