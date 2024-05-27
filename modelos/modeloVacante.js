const { ethers } = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/LARJvo_OjO0VB4jkVmAmSEnzwW5m-yC0');
const signer = new ethers.Wallet('195b7067179fbe66835009b3800bbec93d42b8c794e53525b4bf4c0aed96afab', provider);
const VacanteContractABI = require('../artifacts/contracts/Vacante.sol/Vacantes.json').abi;

function modeloVacante(vacante) {
    return {
      vacanteId: vacante.vacanteId,
      area: vacante.area,
      sueldo: vacante.sueldo,
      activo: vacante.activo
    }
}

const contractVacante = new ethers.Contract('0xf5677020Efb9B2de7F881b7cF248e7100C04CaE8', VacanteContractABI, signer);

    async function registrarVacante(area, sueldo, activo) {
      return await contractVacante.registrarVacante(area, sueldo, activo);
    }

    async function obtenerVacante(vacanteId) {
      const vacante = await contractVacante.obtenerVacantes(vacanteId);
      return modeloVacante(vacante)
    }

    async function obtenerTodasVacantes() {
      const todasVacantes = await contractVacante.obtenerTodasVacantes();
      return todasVacantes.map(modeloVacante)
    }

    async function actualizarVacante(vacanteId, area, sueldo, activo) {
      return await contractVacante.actualizarVacante(vacanteId, area, sueldo, activo)
    }

    async function esVacante(vacanteId) {
      return await contractVacante.esVacante(vacanteId)
    }

module.exports = { registrarVacante, obtenerVacante, obtenerTodasVacantes, actualizarVacante, esVacante };
