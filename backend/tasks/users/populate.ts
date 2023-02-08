import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import ethers from "@nomiclabs/hardhat-ethers";

task("populate", "Populate the contract with users").setAction(async () => {
  const Users = await hre.ethers.getContractFactory("Users");
  const users = await Users.deploy();

  await users.deployed();
  console.log(`Deployed users contract! Address: ${users.address}`);

  await users.createUser("johndoe", { value: 10000 });

  const signers = await hre.ethers.getSigners();

  console.log(signers[0].address);

  for (let i = 1; i <= 12; i++) {
    await users.connect(signers[i]).createUser(String(i), {
      value: 10000,
    });
    await users.sendFriendRequest(String(i));
    await users.connect(signers[i]).acceptFriendRequest(signers[0].address);
  }

  for (let i = 13; i <= 19; i++) {
    await users.connect(signers[i]).createUser(String(i), {
      value: 10000,
    });
  }

  console.log("Users created!");

  await users.createGroup("group1");

  for (let i = 1; i <= 4; i++) {
    await users.sendInvitation(0, signers[i].address);
    await users.connect(signers[i]).acceptInvitation(0);
  }

  console.log("Groups created!");
});
