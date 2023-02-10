import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import ethers from "@nomiclabs/hardhat-ethers";

const names = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Isabella",
  "Sophia",
  "Mia",
  "Charlotte",
  "Amelia",
  "Harper",
  "Evelyn",
  "Abigail",
  "Emily",
  "Elizabeth",
  "Sofia",
  "Avery",
  "Ella",
  "Scarlett",
  "Grace",
];
const expenses = [
  { name: "water", amount: 100 },
  { name: "gas", amount: 345 },
  { name: "electricity", amount: 253 },
  { name: "internet", amount: 90 },
  { name: "food", amount: 210 },
  { name: "rent", amount: 550 },
  { name: "insurance", amount: 120 },
  { name: "phone", amount: 50 },
  { name: "transport", amount: 210 },
  { name: "clothes", amount: 104 },
  { name: "toys", amount: 123 },
  { name: "games", amount: 141 },
  { name: "books", amount: 101 },
  { name: "movies", amount: 120 },
  { name: "music", amount: 50 },
  { name: "gifts", amount: 100 },
];

task("populate", "Populate the contract with users").setAction(async () => {
  const Users = await hre.ethers.getContractFactory("Users");
  const users = await Users.deploy();

  await users.deployed();
  console.log(`Deployed users contract! Address: ${users.address}`);

  await users.createUser("johndoe", { value: 10000 });

  const signers = await hre.ethers.getSigners();

  console.log(signers[0].address);

  for (let i = 1; i <= 12; i++) {
    await users.connect(signers[i]).createUser(names[i], {
      value: 10000,
    });
    await users.sendFriendRequest(names[i]);
    await users.connect(signers[i]).acceptFriendRequest(signers[0].address);
  }

  for (let i = 13; i <= 19; i++) {
    await users.connect(signers[i]).createUser(names[i], {
      value: 10000,
    });
  }

  console.log("Users created!");

  await users.createGroup("group1");

  for (let i = 1; i <= 4; i++) {
    await users.sendInvitation(0, names[i]);
    await users.connect(signers[i]).acceptGroupInvitation(0);
  }

  console.log("Groups created!");

  // for (let i = 1; i <= 4; i++) {
  //   await users.connect(signers[i]).addExpense(0, "water", 100);
  //   await users.connect(signers[i]).addExpense(0, "gas", 345);
  //   await users.connect(signers[i]).addExpense(0, "electricity", 253);
  //   await users.connect(signers[i]).addExpense(0, "internet", 90);
  // }

  for (const [i, expense] of expenses.entries()) {
    // await users.connect(signers[ran]).addExpense(0, expense.name, expense.amount);
    // get random number between 1 and 4
    const ran = Math.floor(Math.random() * 4) + 1;
    await users
      .connect(signers[ran])
      .addExpense(0, expense.name, expense.amount);
  }

  await users.connect(signers[5]).createGroup("Vacations Group");

  for (let i = 6; i <= 8; i++) {
    await users.connect(signers[5]).sendInvitation(1, names[i]);
    await users.connect(signers[i]).acceptGroupInvitation(1);
  }
  await users.connect(signers[5]).sendInvitation(1, "johndoe");
});
