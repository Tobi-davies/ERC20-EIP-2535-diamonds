// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "../interfaces/IERC20.sol";
import "../libraries/libERC20.sol";

contract ERC20Facet is IERC20 {
    ERC20Storage internal store;

    function transfer(address recipient, uint256 amount) external returns (bool) {
        store.balanceOf[msg.sender] -= amount;
        store.balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        store.allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        store.allowance[sender][msg.sender] -= amount;
        store.balanceOf[sender] -= amount;
        store.balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function totalSupply() external view returns (uint256) {
        return store.totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return store.balanceOf[account];
    }

    function allowance(address owner, address spender) external view returns (uint256) {
        return store.allowance[owner][spender];
    }

    function mint(uint256 amount) external {
        store.balanceOf[msg.sender] += amount;
        store.totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }
}
