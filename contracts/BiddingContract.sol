// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IERC721{
    function transferFrom(
        address _from,
        address _to,
        uint256 _nftId,
    ) extenal;
}

contract NftAuction {
    uint256 private constant DURATION = 7days;

    IERC721 public immutable nft;
    uint256 public immutable nftId;

    address payable public immutable seller;
    uint256 public immutable startingPrice;
    uint256 public immutable discountRate;
    uint256 public immutable startAt;
    uint256 public immutable expiresAt;

    constructor(
        uint256 _startingPrice,
        uint256 _discountRate,
        address _nft,
        uint256 _nftId,
    ) {
        seller = payable(msg.sender);
        startingPrice = _startingPrice;
        discountRate = _discountRate;
        startAt = block.timestamp;
        expiresAt = block.timestamp + DURATION;

        require(_startingPrice >= _discountRate + DURATION, "Starting price is too low");

        nft = IERC721(_nft);
        nftId = _nftId;
    }

    function getPrice() public view returns(uint256){
        uint256 timeElapsed = block.timestamp - startAt;
        uint256 discount = discountRate * timeElapsed;

        return startingPrice - discount;
    }

    function buy() external payable {
        require(block.timestamp < expiredAt, "This nft bidding has ended");

        uint256 price = getPrice();
        require(msg.value >= price, "The amount of ETH is end less than the price");

        nft.transferFrom(seller, msg.sender, nftId);

        uint256 refund = msg.value - price;

        if(refund > 0) {
            payable(msg.sender).transfer(refund);
        }
        selfdestruct(seller);
    }
}