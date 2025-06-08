pragma solidity ^0.8.0;

contract NFTMarketplace {
    // ...existing code...

    mapping(uint256 => uint256) private nftPrices;

    // ...existing code...

    function setPrice(uint256 tokenId, uint256 price) public {
        // Ensure the caller is the owner of the NFT
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner");
        // Ensure the price is a valid number
        require(price > 0, "Price must be greater than zero");
        nftPrices[tokenId] = price;
    }

    function getPrice(uint256 tokenId) public view returns (uint256) {
        return nftPrices[tokenId];
    }

    // ...existing code...
}
