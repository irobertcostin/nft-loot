// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// imports 
require("@nomicfoundation/hardhat-verify");
const { ethers, run, network } = require("hardhat")




// async function main() {

//     const CrowdfundingFactory = await ethers.getContractFactory("CrowdfundingEther")
//     console.log("Deploying contract ... ")

//     const Crowdfunding = await CrowdfundingFactory.deploy();
//     await Crowdfunding.waitForDeployment();

//     const contractAddress = await Crowdfunding.getAddress();
//     console.log(`Contract deployed at ${contractAddress}`);

//     const deployoor = contractAddress.getSigners();
//     console.log(`Contract deployer is: ${deployoor.from}`);

// }




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });





// scripts/deploy.js

async function main() {
    // Deploying NFTBattleContract
    const [deployer] = await ethers.getSigners();
    const nftContractAddress = "0x33f8c22E251310785A39461CD78c7671B7d9e274";
    // console.log(deployer.getBalance());
    const NFTBattleContract = await ethers.getContractFactory("Testbtle");
    const nftBattleContract = await NFTBattleContract.deploy(nftContractAddress);

    const contractAddress = await nftBattleContract.getAddress();
    console.log(`Contract deployed at ${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


// 0x159Dbb5C84c035B1A87c06473156a2bf8A7D5E0f

// npx hardhat run scripts/deploy.js --network <network>

// npx hardhat verify --network fuji 0x159Dbb5C84c035B1A87c06473156a2bf8A7D5E0f --constructor-args '["0x33f8c22E251310785A39461CD78c7671B7d9e274"]'
