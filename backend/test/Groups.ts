// import { ethers } from "hardhat";

// import { expect } from "chai";

// // contract Groups {
// //   struct Payment{
// //       address from;
// //       address to;
// //       uint amount;
// //       uint timestamp;
// //       bool accepted;
// //   }
// //   struct Group {
// //       string name;
// //       address admin;
// //       uint smallBalanceAlertAt;
// //       address[] members;
// //       mapping (uint => Payment) payments;
// //       uint paymentCount;
// //   }

// //   uint public groupCount = 0;
// //   mapping (uint => Group) private groups;

// //   function createGroup(string memory name, address[] memory members) external {
// //       require(bytes(name).length > 0, "Name cannot be empty");
// //       require(members.length > 0, "Members cannot be empty");

// //       Users.Friend[] memory friends = Users(0x5FbDB2315678afecb367f032d93F642f64180aa3).getFriends();
// //       for (uint i = 0; i < members.length; i++) {
// //           bool isFriend = false;
// //           for (uint j = 0; j < friends.length; j++) {
// //               if (friends[j].friendAddress == members[i]) {
// //                   isFriend = true;
// //                   break;
// //               }
// //           }
// //           require(isFriend, "Members must be friends");
// //       }

// //       for(uint i = 0; i < members.length; i++) {
// //           for(uint j = i + 1; j < members.length; j++) {
// //               require(members[i] != members[j], "Members must be unique");
// //           }
// //       }

// //       address[] memory allMembers = new address[](members.length + 1);
// //       allMembers[0] = msg.sender;
// //       for (uint i = 0; i < members.length; i++) {
// //           allMembers[i + 1] = members[i];
// //       }

// //       groups[groupCount].name = name;
// //       groups[groupCount].admin = msg.sender;
// //       groups[groupCount].members = allMembers;
// //       groups[groupCount].paymentCount = 0;

// //       groupCount++;
// //   }
// // }

// beforeEach(async function () {
//   const Users = await ethers.getContractFactory("Users");
//   const users = await Users.deploy();
//   await users.deployed();

//   const signers = await ethers.getSigners();

//   await users.createUser("johndoe" + 0, { value: 1000 });
//   // for (let i = 1; i < 5; i++) {
//   //   await users
//   //     .connect(signers[i].address)
//   //     .createUser("johndoe" + i, { value: 1000 });

//   //   await users.connect(signers[i].address).sendFriendRequest("johndoe" + 0);
//   //   await users.acceptFriendRequest("johndoe" + i);
//   // }
// });

// describe("Create Group", function () {
//   it("Should create a new group", async function () {
//     const signers = await ethers.getSigners();
//     console.log(signers);

//     const Groups = await ethers.getContractFactory("Groups");
//     const groups = await Groups.deploy();
//     await groups.deployed();

//     expect(await groups.getGroupCount()).to.equal(0);
//     await groups.createGroup("grocery shopping");
//     expect(await groups.getGroupCount()).to.equal(1);

//     expect(await groups.getGroupName(0)).to.equal("grocery shopping");
//     expect(await groups.getGroupAdmin(0)).to.equal(signers[0].address);
//     expect(await groups.getGroupMembers(0)).to.equal(signers[0].address);
//   });

//   // it("Should not create a new user with empty username", async function () {
//   //   const Users = await ethers.getContractFactory("Users");
//   //   const users = await Users.deploy();
//   //   await users.deployed();

//   //   await expect(users.createUser("")).to.be.revertedWith(
//   //     "Username cannot be empty"
//   //   );
//   // });
// });
