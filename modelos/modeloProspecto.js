const { ethers } = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/LARJvo_OjO0VB4jkVmAmSEnzwW5m-yC0');
const signer = new ethers.Wallet('195b7067179fbe66835009b3800bbec93d42b8c794e53525b4bf4c0aed96afab', provider);
const ProspectoContractABI = require('../artifacts/contracts/Prospecto.sol/Prospectos.json').abi;

function modeloProspecto(prospecto) {
    return {
      prospectoId: prospecto.prospectoId,
      nombre: prospecto.nombre,
      correo: prospecto.correo,
      fecha_registro: prospecto.fecha_registro
    }
}

const contractProspecto = new ethers.Contract('0x51a2aE20Ede4cb452193B49849926CC7f76AcED7', ProspectoContractABI, signer);

    async function registrarProspecto(nombre, correo, fecha_registro) {
      return await contractProspecto.registrarProspecto(nombre, correo, fecha_registro);
    }

    async function obtenerProspecto(prospectoId) {
      const prospecto = await contractProspecto.obtenerProspectos(prospectoId)
      return modeloProspecto(prospecto)
    }

    async function obtenerTodosProspectos() {
      const todosProspectos = await contractProspecto.obtenerTodosProspectos();
      return todosProspectos.map(modeloProspecto)
    }

    async function actualizarProsepcto(prospectoId, nombre, correo, fecha_registro) {
      return await contractProspecto.actualizarProspecto(prospectoId, nombre, correo, fecha_registro)
    }

    async function esProspectos(prospectoId) {
      return await contractProspecto.esProspecto(prospectoId);
    }

module.exports = { registrarProspecto, obtenerProspecto, obtenerTodosProspectos, actualizarProsepcto, esProspectos };
