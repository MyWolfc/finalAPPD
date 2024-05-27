const { ethers } = require("hardhat");
async function main(){
    const Entrevistas = await ethers.getContractFactory('Entrevistas');
    const entrevistas = await Entrevistas.deploy()
    const txHash = entrevistas.deployTransaction.hash;
    const txReceipt = await ethers.provider.waitForTransaction(txHash);
    console.log("Contract deployed to Address:", txReceipt.contractAddress);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});