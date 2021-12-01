// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

contract GameSeed {
  uint index = 0;

  constructor() {
    // Contract deployer gets first minted seed for fun
    mint();
  }

  mapping (address => SeedParts[]) public seedPartsByOwner;

  struct SeedParts {
    uint256 blockNumber;
    uint256 index;
  }

  function mint() public {
    seedPartsByOwner[msg.sender].push(SeedParts(block.number, index++));
  }

  function getSeed(uint256 whichIndex) public view returns(bytes memory seed) {
    SeedParts storage seedParts = seedPartsByOwner[msg.sender][whichIndex];

    seed = bytes.concat(
      seed, 
      sha256(abi.encodePacked(msg.sender, seedParts.blockNumber, seedParts.index))
    );

    // Pad the length of the seed to make it 4096 bits
    for (uint8 i = 0; i < 15; i++) {
      seed = bytes.concat(seed, sha256(abi.encodePacked(seed)));
    }
  }
}
