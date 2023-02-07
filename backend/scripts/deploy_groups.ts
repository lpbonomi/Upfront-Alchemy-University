import { ethers } from "hardhat";

async function main() {
  const Groups = await ethers.getContractFactory("Groups");
  const groups = await Groups.deploy();

  await groups.deployed();

  console.log(`Deployed groups contract! Address: ${groups.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
