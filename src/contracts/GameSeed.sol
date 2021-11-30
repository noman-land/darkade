// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

contract GameSeed {
  uint index = 0;

  constructor() {
    // Contract deployer gets first minted seed for fun
    mint();
  }

  mapping (bytes => address) public ownerBySeed;
  mapping (address => bytes) public seedByOwner;

  function mint() public returns(bytes memory seed) {
    // Create unique seed based on caller
    seed = bytes.concat(
      seed, 
      sha256(abi.encodePacked(msg.sender, block.number, index++))
    );

    // Pad the length of the seed to make it 4096 bits
    for (uint8 i = 0; i < 15; i++) {
      seed = bytes.concat(seed, sha256(abi.encodePacked(seed)));
    }

    ownerBySeed[seed] = msg.sender;
    seedByOwner[msg.sender] = seed;
  }
}
