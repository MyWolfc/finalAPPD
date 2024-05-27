const { ethers } = require("hardhat");
async function main(){
    const Prospectos = await ethers.getContractFactory('Prospectos');
    const prospectos = await Prospectos.deploy()
    const txHash = prospectos.deployTransaction.hash;
    const txReceipt = await ethers.provider.waitForTransaction(txHash);
    console.log("Contract deployed to Address:", txReceipt.contractAddress);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});