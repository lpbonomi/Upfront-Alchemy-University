//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

contract Users {

    struct User {
        string username;
        uint balance;
        uint friendCount;
        mapping (address => bool) friendRequests;
        mapping (uint => address) friends;
        uint[] groupIds;
    }

    struct Friend {
        address friendAddress;
        string username;
    }

    mapping (address => User) public users;
    mapping (string => address) public usernames;

    event FriendRequest(address from, address indexed to);

    modifier onlyRegisteredUser() {
        require(bytes(users[msg.sender].username).length > 0, "User not registered");
        _;
    }

    function isRegistered() public view returns (bool) {
        return bytes(users[msg.sender].username).length > 0;
    }

    function createUser(string memory username) external payable {
        require(bytes(username).length > 0, "Username cannot be empty");
        require(bytes(users[msg.sender].username).length == 0, "User already created");
        require(usernames[username] == address(0), "Username already taken");
        require(msg.value > 0, "Balance cannot be 0");

        users[msg.sender].username = username;
        users[msg.sender].balance = msg.value;
        users[msg.sender].friendCount = 0;

        usernames[username] = msg.sender;
    }
    
    function getUsername() public view onlyRegisteredUser returns (string memory) {
        return users[msg.sender].username;
    }

    function getBalance() public view onlyRegisteredUser returns (uint) {
        return users[msg.sender].balance;
    }

    function deposit() external payable onlyRegisteredUser {
        require(msg.value > 0, "Balance cannot be 0");
        users[msg.sender].balance += msg.value;
    }

    function withdraw(uint amount) external onlyRegisteredUser {
        require(users[msg.sender].balance >= amount, "Insufficient funds");
        users[msg.sender].balance -= amount;
        payable(msg.sender).transfer(amount);
    }

    function transfer(address to, uint amount) external onlyRegisteredUser {
        require(users[msg.sender].balance >= amount, "Insufficient funds");
        users[msg.sender].balance -= amount;
        users[to].balance += amount;
    }

    function sendFriendRequest(string memory username) external onlyRegisteredUser {
        require(bytes(username).length > 0, "Username cannot be empty");
        require(keccak256(abi.encodePacked(username)) != keccak256(abi.encodePacked(users[msg.sender].username)), "Cannot add self as friend");
        require(usernames[username] != address(0), "Friend not registered");
        require(users[msg.sender].friendCount < 24, "Cannot add more than 24 friends");
        require(users[usernames[username]].friendRequests[msg.sender] == false, "Friend request already received");
        require(users[msg.sender].friendRequests[usernames[username]] == false, "Friend request already sent");
        for (uint i = 0; i < users[msg.sender].friendCount; i++) {
            require(users[msg.sender].friends[i] != usernames[username], "Friend already added");
        }

        users[msg.sender].friendRequests[usernames[username]] = true;

        emit FriendRequest(msg.sender, usernames[username]);
    }

    function acceptFriendRequest(address friend) public {
        require(users[friend].friendRequests[msg.sender] == true, "Friend request not found");
        require(users[msg.sender].friendCount < 24, "Cannot add more than 24 friends");

        users[msg.sender].friendRequests[friend] = false;

        users[msg.sender].friends[users[msg.sender].friendCount] = friend;
        users[msg.sender].friendCount++;

        users[friend].friends[users[friend].friendCount] = msg.sender;
        users[friend].friendCount++;
    }

    function deleteFriendRequest(address friend) public {
        require(users[friend].friendRequests[msg.sender] == true, "Friend request not found");

        users[friend].friendRequests[msg.sender] = false;
    }

    function getFriends() public view onlyRegisteredUser returns (Friend[] memory) {
        address[] memory addresses = new address[](users[msg.sender].friendCount);
        string[] memory friendsUsernames = new string[](users[msg.sender].friendCount);
        Friend[] memory friends = new Friend[](users[msg.sender].friendCount);
        for (uint i = 0; i < users[msg.sender].friendCount; i++) {
            addresses[i] = users[msg.sender].friends[i];
            friendsUsernames[i] = users[users[msg.sender].friends[i]].username;
            friends[i] = Friend({friendAddress: addresses[i], username: friendsUsernames[i]});
        }
        return friends;
    }

    function getGroupIds() public view onlyRegisteredUser returns (uint[] memory) {
        return users[msg.sender].groupIds;
    }

    function addGroup(uint groupId) public onlyRegisteredUser {
        require(users[msg.sender].groupIds.length < 10, "Cannot add more than 10 groups");
        users[msg.sender].groupIds.push(groupId);
    }
}