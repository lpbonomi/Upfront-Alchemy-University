//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "./Users.sol";

contract Groups {
    struct Payment{
        address from;
        address to;
        uint amount;
        uint timestamp;
        bool accepted;
    }
    struct Group {
        string name;
        address admin;
        address[] members;
        mapping (uint => Payment) payments;
        uint paymentCount;
        mapping (address => bool) isInvited;
        mapping (address => bool) isMember;
    }

    address private USERS_ADDRESS = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
    uint public groupCount = 0;
    mapping (uint => Group) private groups;

    event MemberInvited(uint groupId, address member);

    // function createGroup(string memory name, string[] memory members) external {
    //     require(bytes(name).length > 0, "Name cannot be empty");
    //     require(members.length > 0, "Members cannot be empty");
    //     require(members.length < 4, "Total members cannot be more than 5");
    //     for (uint i = 0; i < members.length; i++) {
    //         require(bytes(members[i]).length > 0, "Members cannot have empty usernames");
    //     }

    //     address[] memory allMembers = new address[](members.length + 1);
    //     allMembers[0] = msg.sender;

    //     Users.Friend[] memory friends = Users(USERS_ADDRESS).getFriends();

    //     for (uint i = 0; i < members.length; i++) {
    //         bool isFriend = false;
    //         for (uint j = 0; j < friends.length; j++) {
    //             if (keccak256(bytes(friends[j].username)) == keccak256(bytes(members[i]))) {
    //                 isFriend = true;
    //                 allMembers[i + 1] = friends[j].friendAddress;
    //                 break;
    //             }
    //         }
    //         require(isFriend, "Members must be registered and be friends");
    //     }
    //     // members must be unique
    //     for(uint i = 0; i < members.length; i++) {
    //         for(uint j = i + 1; j < members.length; j++) {
    //            require(allMembers[i] != allMembers[j], "Members must be unique");
    //         }
    //     }

    //     groups[groupCount].name = name;
    //     groups[groupCount].admin = msg.sender;
    //     groups[groupCount].members = allMembers;
    //     groups[groupCount].paymentCount = 0;

    //     groupCount++;
    // }

    function createGroup(string memory name) external{
        require(bytes(name).length > 0, "Name cannot be empty");
        Users users = Users(USERS_ADDRESS);
        require(users.getGroupIds().length < 10, "User cannot have more than 10 groups");

        groups[groupCount].name = name;
        groups[groupCount].admin = msg.sender;
        groups[groupCount].members.push(msg.sender);
        groups[groupCount].paymentCount = 0;
        groupCount++;
    }

    function inviteMember(uint groupId, address member) external {
        require(groups[groupId].admin == msg.sender, "Only admin can invite members");
        require(groups[groupId].isInvited[member] == false, "Invitation already sent");
        require(groups[groupId].isMember[member] == false, "Member already exists");
        require(groups[groupId].members.length < 5, "Total members cannot be more than 5");

        groups[groupId].isInvited[member] = true;
        emit MemberInvited(groupId, member);
    }

    function acceptInvitation(uint groupId) external {
        require(groups[groupId].isInvited[msg.sender] == true, "Invitation not found");

        groups[groupId].isInvited[msg.sender] = false;
        groups[groupId].isMember[msg.sender] = true;
        groups[groupId].members.push(msg.sender);

        Users(USERS_ADDRESS).addGroup(groupId);
    }

    function getGroupCount() public view returns (uint) {
        return groupCount;
    }

    function getGroupName(uint groupId) public view returns (string memory) {
        return groups[groupId].name;
    }

    function getGroupAdmin(uint groupId) public view returns (address) {
        return groups[groupId].admin;
    }

    function getGroupMembers(uint groupId) public view returns (address[] memory) {
        return groups[groupId].members;
    }

    function getGroupPayments(uint groupId) public view returns (Payment[] memory) {
        Payment[] memory allPayments = new Payment[](groups[groupId].paymentCount);
        for (uint i = 0; i < groups[groupId].paymentCount; i++) {
            allPayments[i] = groups[groupId].payments[i];
        }
        return allPayments;
    }

    function getGroupPayment(uint groupId, uint paymentId) public view returns (Payment memory) {
        return groups[groupId].payments[paymentId];
    }
}