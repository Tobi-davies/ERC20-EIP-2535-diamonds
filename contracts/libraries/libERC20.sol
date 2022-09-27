// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct ERC20Storage {
    uint256 totalSupply;
    mapping(address => mapping(address => uint256)) allowance;
    mapping(address => uint256) balanceOf;
    string name;
    string symbol;
    uint8 decimals;
}
