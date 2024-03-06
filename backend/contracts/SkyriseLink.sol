// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

/// @custom:security-contact akshay@blocumen.com
contract SkyriseLink {
    uint256 public participants = 0;
    mapping(address => uint256) public uses;
    mapping(address => bool) participating;
    mapping(string => address) public key;
    mapping(address => uint256) public rewards;

    struct Task {
        string projectId;
        string redirectLink;
        uint256 unitReward;
    }
    Task public task;

    constructor(string memory _projectId, string memory _redirectLink) payable {
        task = Task(_projectId, _redirectLink, msg.value);
    }

    function participate(address _sender, string memory _key) external {
        require(participating[_sender] == false, "You are already participating!");
        uses[_sender] = 0;
        participants++;
        participating[_sender] = true;
        key[_key] = _sender;
        rewards[_sender] = 0;
        return;
    }

    function withdraw(address _sender) external {
        require(participating[_sender] == true, "You are not participating at the moment!");
        uses[_sender] = 0;
        participants--;
        participating[_sender] = false;
        return;
    }

    function setUse(address _user) external {
        uses[_user]++;
        return;
    }

    function reward(address payable _user) external {
        uint256 amount = uses[_user] * task.unitReward;
        _user.transfer(amount);
        rewards[_user] = rewards[_user] + amount;
        uses[_user] = 0;
        return;
    }

}
