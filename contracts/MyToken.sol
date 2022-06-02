//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
  uint public INITIAL_SUPPLY = 100000000;
  constructor() public ERC20("Penguin Token", "PGT") {
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}