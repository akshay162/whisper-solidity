
const writeToBlockChain = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners();

    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log('Contract balance: ' ,hre.ethers.utils.formatEther(contractBalance));

    // console.log("Contract deployed by:", owner.address);

    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave('First message !!');
    await waveTxn.wait();

    let waveTxn2 = await waveContract.wave('Second message !!');
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance after txn: ", hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

}

const runMain = async () => {
    try {
        await writeToBlockChain();
        process.exit(0);
    } catch (err) {
        console.log(error);
        process.exit(1);
    }
}

runMain();