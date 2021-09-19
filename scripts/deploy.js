async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contract with account: ", deployer.address);
    console.log("Account balance: ", (await deployer.getBalance()).toString());

    const Token = await hre.ethers.getContractFactory("WavePortal");
    const token = await Token.deploy({ value: hre.ethers.utils.parseEther("0.1") });

    console.log("WavePortal Address:", token.address);
}

main()
    .then(() => { process.exit(0) })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });