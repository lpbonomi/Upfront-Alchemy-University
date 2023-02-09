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

    struct Expense{
        address paidBy;
        string description;
        uint amount;
    }

    struct ExpenseView{
        uint id;
        Friend paidBy;
        string description;
        uint amount;
    }

    struct Group {
        string name;
        address admin;
        address[] members;
        mapping (uint => Expense) expenses;
        uint expenseCount;
        mapping (address => bool) isInvited;
        mapping (address => bool) isMember;
    }

    struct GroupView {
        uint id;
        string name;
        string admin;
        ExpenseView[] expenses;
        Friend[] members;
        uint expenseCount;
    }

    mapping (address => User) public users;
    mapping (string => address) public usernames;
    mapping (uint => Group) private groups;

    uint public groupCount = 0;

    event FriendRequest(address from, address indexed to);
    event GroupInvite(uint groupId, address indexed to);

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
    
    function getUsername() public view returns (string memory) {
        return users[msg.sender].username;
    }

    function getBalance() public view returns (uint) {
        return users[msg.sender].balance;
    }

    function getGroupIds() public view returns (uint[] memory) {
        return users[msg.sender].groupIds;
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

    function getFriends() public view returns (Friend[] memory) {
        User storage user = users[msg.sender];
        address[] memory addresses = new address[](user.friendCount);
        string[] memory friendsUsernames = new string[](user.friendCount);
        Friend[] memory friends = new Friend[](user.friendCount);
        for (uint i = 0; i < user.friendCount; i++) {
            addresses[i] = user.friends[i];
            friendsUsernames[i] = users[user.friends[i]].username;
            friends[i] = Friend({friendAddress: addresses[i], username: friendsUsernames[i]});
        }
        return friends;
    }


    function createGroup(string memory name) external{
        require(bytes(name).length > 0, "Name cannot be empty");
        require(users[msg.sender].groupIds.length < 10, "User cannot have more than 10 groups");

        groups[groupCount].name = name;
        groups[groupCount].admin = msg.sender;
        groups[groupCount].members.push(msg.sender);
        groups[groupCount].expenseCount = 0;
        users[msg.sender].groupIds.push(groupCount);
        groups[groupCount].isMember[msg.sender] = true;

        groupCount++;
    }

    function sendInvitation(uint groupId, string memory member) external {
        require(groups[groupId].admin == msg.sender, "Only admin can invite members");
        require(usernames[member] != address(0), "Member not registered");
        User storage user = users[usernames[member]];
        require(user.groupIds.length < 10, "Member cannot have more than 10 groups");
        require(groups[groupId].isInvited[usernames[member]] == false, "Member already invited");
        require(groups[groupId].isMember[usernames[member]] == false, "Member already added");
        require(groups[groupId].members.length < 5, "Total members cannot be more than 5");

        groups[groupId].isInvited[usernames[member]] = true;
        emit GroupInvite(groupId, usernames[member]);
    }

    function acceptGroupInvitation(uint groupId) external {
        require(groups[groupId].isInvited[msg.sender] == true, "Invitation not found");

        groups[groupId].isInvited[msg.sender] = false;
        groups[groupId].isMember[msg.sender] = true;
        groups[groupId].members.push(msg.sender);

        addGroup(groupId);
    }

    function deleteGroupInvitation(uint groupId) external {
        require(groups[groupId].isInvited[msg.sender] == true, "Invitation not found");

        groups[groupId].isInvited[msg.sender] = false;
    }

    function getGroupCount() public view returns (uint) {
        return groupCount;
    }

    function getGroups() public view returns (GroupView[] memory) {
        GroupView[] memory allGroups = new GroupView[](users[msg.sender].groupIds.length);
        for (uint i = 0; i < users[msg.sender].groupIds.length; i++) {
            ExpenseView[] memory expenses = new ExpenseView[](groups[users[msg.sender].groupIds[i]].expenseCount);
            for (uint j = 0; j < groups[users[msg.sender].groupIds[i]].expenseCount; j++) {
                Expense memory expense = groups[users[msg.sender].groupIds[i]].expenses[j];
                expenses[j] = ExpenseView({
                    id: j,
                    description: expense.description,
                    amount: expense.amount,
                    paidBy: Friend({
                        friendAddress: expense.paidBy,
                        username: users[expense.paidBy].username
                    })
                });
            }


            Friend[] memory members = new Friend[](groups[users[msg.sender].groupIds[i]].members.length);
            for (uint j = 0; j < groups[users[msg.sender].groupIds[i]].members.length; j++) {
                members[j] = Friend({
                    friendAddress: groups[users[msg.sender].groupIds[i]].members[j],
                    username: users[groups[users[msg.sender].groupIds[i]].members[j]].username
                });
            }

            allGroups[i].id = users[msg.sender].groupIds[i];
            allGroups[i].name = groups[users[msg.sender].groupIds[i]].name;
            allGroups[i].admin = users[groups[users[msg.sender].groupIds[i]].admin].username;
            allGroups[i].expenses = expenses;
            allGroups[i].members = members;
            allGroups[i].expenseCount = groups[users[msg.sender].groupIds[i]].expenseCount;
        }
        return allGroups;
    }

    function getGroupName(uint groupId) public view returns (string memory) {
        return groups[groupId].name;
    }

    function getGroupAdmin(uint groupId) public view returns (address) {
        return groups[groupId].admin;
    }

    function getGroupMembers(uint groupId) public view returns (Friend[] memory) {
        Friend[] memory members = new Friend[](groups[groupId].members.length);
        for (uint i = 0; i < groups[groupId].members.length; i++) {
            members[i] = Friend({
                friendAddress: groups[groupId].members[i],
                username: users[groups[groupId].members[i]].username
            });
        }
        return members;
    }

    function addGroup(uint groupId) internal  {
        require(users[msg.sender].groupIds.length < 10, "Cannot add more than 10 groups");
        users[msg.sender].groupIds.push(groupId);
    }

    function addExpense(uint groupId, string memory description, uint amount) public {
        require(groups[groupId].isMember[msg.sender] == true, "User is not a member of the group");
        require(groups[groupId].expenseCount < 100, "Cannot add more than 100 expenses");

        groups[groupId].expenses[groups[groupId].expenseCount].description = description;
        groups[groupId].expenses[groups[groupId].expenseCount].amount = amount;
        groups[groupId].expenses[groups[groupId].expenseCount].paidBy = msg.sender;

        uint amountPerMember = amount / groups[groupId].members.length;

        for (uint i = 0; i < groups[groupId].members.length; i++) {
            if (groups[groupId].members[i] != msg.sender) {
                users[groups[groupId].members[i]].balance -= amountPerMember;
            }
        }

        users[msg.sender].balance -= amount - (amountPerMember * (groups[groupId].members.length - 1));

        groups[groupId].expenseCount++;
    }
}
