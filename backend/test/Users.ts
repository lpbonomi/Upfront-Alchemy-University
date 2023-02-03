import { ethers } from "hardhat";

const { expect } = require("chai");

describe("Create User", function () {
  it("Should create a new user", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    await expect(await users.getUsername()).to.equal("johndoe");
    await expect(await users.getBalance()).to.equal(100);
    await expect(await users.getFriends()).to.have.lengthOf(0);
  });

  it("Should not create a new user with empty username", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await expect(users.createUser("")).to.be.revertedWith(
      "Username cannot be empty"
    );
  });

  it("Should not create a user with balance 0", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await expect(users.createUser("johndoe")).to.be.revertedWith(
      "Balance cannot be 0"
    );
  });

  it("Should not create a new user with taken username", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const otherUser = (await ethers.getSigners())[1];

    await expect(
      users.connect(otherUser).createUser("johndoe", { value: 100 })
    ).to.be.revertedWith("Username already taken");
  });
});

it("Should not let the user create a new user twice", async function () {
  const Users = await ethers.getContractFactory("Users");
  const users = await Users.deploy();
  await users.deployed();

  await users.createUser("johndoe", { value: 100 });
  await expect(users.createUser("johndoe 2")).to.be.revertedWith(
    "User already created"
  );
});

describe("Only Registered User", function () {
  it("Should not let a non-registered user call a function", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await expect(users.getUsername()).to.be.revertedWith("User not registered");
    await expect(users.getBalance()).to.be.revertedWith("User not registered");
    await expect(
      users.sendFriendRequest("0x0000000000000000000000000000000000000000")
    ).to.be.revertedWith("User not registered");
    await expect(users.getFriends()).to.be.revertedWith("User not registered");
    await expect(
      users.transfer("0x0000000000000000000000000000000000000000", 100)
    ).to.be.revertedWith("User not registered");
    await expect(users.deposit({ value: 100 })).to.be.revertedWith(
      "User not registered"
    );
    await expect(users.withdraw(100)).to.be.revertedWith("User not registered");
  });
});

describe("Transfer", function () {
  it("Should transfer funds", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const otherSigner = (await ethers.getSigners())[1];
    await users.connect(otherSigner).createUser("williamowen", {
      value: 100,
    });
    await users.transfer(otherSigner.address, 50);
    await expect(await users.getBalance()).to.equal(50);
    await expect(await users.connect(otherSigner).getBalance()).to.equal(150);
  });

  it("Should not transfer funds if insufficient funds", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const otherSigner = (await ethers.getSigners())[1];
    await users.connect(otherSigner).createUser("williamowen", {
      value: 100,
    });
    await expect(users.transfer(otherSigner.address, 101)).to.be.revertedWith(
      "Insufficient funds"
    );
  });
});

describe("Add Friend", function () {
  it("Should add a friend", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const user = (await ethers.getSigners())[0];
    const friend = (await ethers.getSigners())[1];

    await users.connect(friend).createUser("williamowen", {
      value: 100,
    });

    await expect(users.sendFriendRequest(friend.address))
      .to.emit(users, "FriendRequest")
      .withArgs(user.address, friend.address);

    await expect(await users.getFriends()).to.have.lengthOf(0);
    await expect(await users.getFriends()).to.not.include(friend.address);

    await users.connect(friend).acceptFriendRequest(user.address);

    await expect(await users.getFriends()).to.have.lengthOf(1);
    await expect((await users.getFriends())[0].friendAddress).to.equal(
      friend.address
    );
    await expect((await users.getFriends())[0].username).to.equal(
      "williamowen"
    );
  });

  it("Should not add a friend if user is empty", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const friend = (await ethers.getSigners())[1];

    await users.connect(friend).createUser("williamowen", {
      value: 100,
    });

    await expect(
      users.sendFriendRequest(ethers.constants.AddressZero)
    ).to.be.revertedWith("Friend cannot be empty");
  });

  it("Should not add a friend if user is already a friend", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const user = (await ethers.getSigners())[0];
    const friend = (await ethers.getSigners())[1];

    await users.connect(friend).createUser("williamowen", {
      value: 100,
    });

    await users.sendFriendRequest(friend.address);
    await users.connect(friend).acceptFriendRequest(user.address);

    await expect(users.sendFriendRequest(friend.address)).to.be.revertedWith(
      "Friend request already sent"
    );
  });

  it("Should not add a friend if user is the same as the user", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const user = (await ethers.getSigners())[0];

    await expect(users.sendFriendRequest(user.address)).to.be.revertedWith(
      "Cannot add self as friend"
    );
  });

  // todo: fix this test
  it("Should not add more than 24 friends", async function () {
    const Users = await ethers.getContractFactory("Users");
    const users = await Users.deploy();
    await users.deployed();

    await users.createUser("johndoe", { value: 100 });

    const signers = await ethers.getSigners();

    for (let i = 1; i <= 24; i++) {
      await users.connect(signers[i]).createUser(String(i), {
        value: 100,
      });
      await users.sendFriendRequest(signers[i].address);
      await users.connect(signers[i]).acceptFriendRequest(signers[0].address);
    }

    await users.connect(signers[25]).createUser(String(25), {
      value: 100,
    });

    await expect(
      users.sendFriendRequest(signers[25].address)
    ).to.be.revertedWith("Cannot add more than 24 friends");
  });
});
