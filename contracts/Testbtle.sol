// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Testbtle is ERC721Holder, ReentrancyGuard, Ownable {
    IERC721 public nftContract; // The ERC721 contract instance
    uint256 public constant lockDuration = 10 minutes;
    uint256 public constant rewardAmount = 0.1 ether;

    struct Deposit {
        address depositor;
        uint256 tokenId;
        uint256 depositTime;
    }

    mapping(uint256 => Deposit) public deposits;

    constructor(address _nftContractAddress) Ownable(msg.sender) {
        nftContract = IERC721(_nftContractAddress);
    }

    function depositToken(uint256 tokenId) public nonReentrant {
            require(address(this).balance >= rewardAmount*2, "Contract lacks funds for reward.");

        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "You must own the token."
        );
        nftContract.transferFrom(msg.sender, address(this), tokenId);

        deposits[tokenId] = Deposit({
            depositor: msg.sender,
            tokenId: tokenId,
            depositTime: block.timestamp
        });
    }

    function claimReward(uint256 tokenId) public nonReentrant {
        require(
            deposits[tokenId].depositor == msg.sender,
            "You must be the depositor."
        );
        require(
            block.timestamp >= deposits[tokenId].depositTime + lockDuration,
            "Lock period not yet over."
        );

        
        nftContract.transferFrom(address(this), msg.sender, tokenId);
        payable(msg.sender).transfer(rewardAmount);
        delete deposits[tokenId]; // Remove deposit record
    }


    function getRemainingLockTime(uint256 tokenId) public view returns (uint256) {
        require(deposits[tokenId].depositor != address(0), "Token not deposited.");

        uint256 timePassed = block.timestamp - deposits[tokenId].depositTime;
        if (timePassed >= lockDuration) {
            return 0; // Lock period is over
        } else {
            return (lockDuration - timePassed);
        }
    }



    // Function to allow the contract to receive Ether
    receive() external payable {}

    // Withdraw function for contract owner
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
}
