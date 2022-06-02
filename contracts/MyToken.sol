//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
  uint public INITIAL_SUPPLY = 10000000000000000000000000000;
  constructor() public ERC20("New Penguin Token", "PNT") {
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}