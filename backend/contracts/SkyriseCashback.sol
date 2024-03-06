// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

/// @custom:security-contact akshay@blocumen.com
contract SkyriseCashback {
    mapping(address => uint256) public cashback;
    mapping(address => uint256) public payouts;

    constructor() {}
    
    function newUser(address _user) external {
        cashback[_user] = 0;
        payouts[_user] = 0;
        return;
    }

    function elligibleCashback(address _user, uint256 _amount) external {
        cashback[_user] = cashback[_user] + _amount;
        return;
    }

    function payout(address payable _user, uint256 _amount) external {
        require(_amount < cashback[_user], "");
        _user.transfer(_amount);
        cashback[_user] = cashback[_user] - _amount;
        payouts[_user] = payouts[_user] + _amount;
        return;
    }

}
