const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("point1");
  const MyTokenContract = await hre.ethers.getContractFactory("MyToken");
  console.log("point2");
  const myTokenContract = await MyTokenContract.deploy();
  console.log("point3");

  await myTokenContract.deployed();
  console.log("point4");

  console.log("Your deployed contract address:", contract.address);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });