const { ethers } = require("ethers");

async function main() {
    const [owner, randoPerson] = await hre.ethers.getSigners();
    const waveFactory = await hre.ethers.getContractFactory("WavePortal");

    const waveContract = await waveFactory.deploy({ value: hre.ethers.utils.parseEther("0.1") });
    await waveContract.deployed();

    console.log("contract deployed to:", waveContract.address);
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave('A messag!');
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randoPerson).wave('Another message');
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })