// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "../interfaces/IERC20.sol";
import "../libraries/libERC20.sol";

contract ERC20V2Facet {
    ERC20Storage internal store;

    event Transfer(address indexed from, address indexed to, uint256 value);

    function burn(uint256 amount) external {
        store.balanceOf[msg.sender] -= amount;
        store.totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }

    function name() external view returns (string memory) {
        return store.name;
    }

    function symbol() external view returns (string memory) {
        return store.symbol;
    }

    function decimals() external view returns (uint8) {
        return store.decimals;
    }
}
