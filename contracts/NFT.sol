// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public tokenLimit;

    constructor(uint256 _tokenLimit) ERC721("weirdpixels", "WEIRDPIXELS") {
        tokenLimit = _tokenLimit;
        console.log("Deploying Weird Pixels contract.");
    }

    modifier checkLimit() {
        require(_tokenIds.current() < tokenLimit, "Reached token limit");
        _;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function mintNFT(string memory metadataIpfsUri)
        public
        checkLimit
        onlyOwner
    {
        uint256 tokenId = _tokenIds.current();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataIpfsUri);

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            tokenId,
            msg.sender
        );

        _tokenIds.increment();
    }
}
