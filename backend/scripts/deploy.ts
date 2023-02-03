import { ethers } from "hardhat";

async function main() {
  const Users = await ethers.getContractFactory("Users");
  const users = await Users.deploy();

  await users.deployed();

  console.log(`Deployed! Address: ${users.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
