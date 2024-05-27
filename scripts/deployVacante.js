const { ethers } = require("hardhat");
async function main(){
    const Vacantes = await ethers.getContractFactory('Vacantes');
    const vacantes = await Vacantes.deploy()
    const txHash = vacantes.deployTransaction.hash;
    const txReceipt = await ethers.provider.waitForTransaction(txHash);
    console.log("Contract deployed to Address:", txReceipt.contractAddress);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});