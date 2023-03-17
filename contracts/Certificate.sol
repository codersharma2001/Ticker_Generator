// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Certificate is ERC721 {
    constructor() ERC721("Certificate", "CERT") {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}
