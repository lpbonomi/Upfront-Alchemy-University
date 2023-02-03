//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

contract Users {

    struct User {
        string username;
        string name;
        uint balance;
        uint friendCount;
        mapping (address => bool) friendRequests;
        mapping (uint => address) friends;
    }

    mapping (address => User) public users;
    mapping (string => address) private usernames;

    event FriendRequest(address from, address to);

    modifier onlyRegisteredUser() {
        require(bytes(users[msg.sender].name).length > 0, "User not registered");
        _;
    }

    function createUser(string memory name, string memory username) external payable {
        require(bytes(username).length > 0, "Username cannot be empty");
        require(usernames[username] == address(0), "Username already taken");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(msg.value > 0, "Balance cannot be 0");
        require(bytes(users[msg.sender].name).length == 0, "User already created");

        users[msg.sender].name = name;
        users[msg.sender].username = username;
        users[msg.sender].balance = msg.value;
        users[msg.sender].friendCount = 0;

        usernames[username] = msg.sender;
    }
    
    function getName() public view onlyRegisteredUser returns (string memory) {
        return users[msg.sender].name;
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

    function sendFriendRequest(address friend) external onlyRegisteredUser {
        require(friend != address(0), "Friend cannot be empty");
        require(friend != msg.sender, "Cannot add self as friend");
        require(bytes(users[friend].name).length > 0, "Friend not registered");
        require(users[msg.sender].friendRequests[friend] == false, "Friend request already sent");
        require(users[msg.sender].friendCount < 10, "Cannot add more than 10 friends");
        for (uint i = 0; i < users[msg.sender].friendCount; i++) {
            require(users[msg.sender].friends[i] != friend, "Friend already added");
        }

        users[msg.sender].friendRequests[friend] = true;

        emit FriendRequest(msg.sender, friend);
    }

    function acceptFriendRequest(address friend) public {
        require(users[friend].friendRequests[msg.sender] == true, "Friend request not found");
        require(users[msg.sender].friendCount < 10, "Cannot add more than 10 friends");
        for (uint i = 0; i < users[msg.sender].friendCount; i++) {
            require(users[msg.sender].friends[i] != friend, "Friend already added");
        }

        users[msg.sender].friendRequests[friend] = false;

        users[msg.sender].friends[users[msg.sender].friendCount] = friend;
        users[msg.sender].friendCount++;

        users[friend].friends[users[friend].friendCount] = msg.sender;
        users[friend].friendCount++;
    }


    function getFriends() public view onlyRegisteredUser returns (address[] memory) {
        address[] memory friends = new address[](users[msg.sender].friendCount);
        for (uint i = 0; i < users[msg.sender].friendCount; i++) {
            friends[i] = users[msg.sender].friends[i];
        }
        return friends;
    }
}