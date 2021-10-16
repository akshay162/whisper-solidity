const writeToBlockChain = async() => {
    const [deployer] = await hre.ethers.getSigners();
    const walletBalance = await deployer.getBalance();

    console.log(" deployer address is %s", deployer.address);
    console.log("Accout bal of deployer is ", walletBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.007')
    });

    await waveContract.deployed();

    console.log("Wave portal address : ", waveContract.address);
}

const runMain = async () => {
    try {
      await writeToBlockChain();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();