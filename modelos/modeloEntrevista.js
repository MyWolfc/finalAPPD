const { ethers } = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/LARJvo_OjO0VB4jkVmAmSEnzwW5m-yC0');
const signer = new ethers.Wallet('195b7067179fbe66835009b3800bbec93d42b8c794e53525b4bf4c0aed96afab', provider);
const EntrevistaContractABI = require('../artifacts/contracts/Entrevista.sol/Entrevistas.json').abi;
const ProspectoContractABI = require('../artifacts/contracts/Prospecto.sol/Prospectos.json').abi;
const VacanteContractABI = require('../artifacts/contracts/Vacante.sol/Vacantes.json').abi;


function modeloEntrevista(entrevista){
    return{
        entrevistaId: entrevista.entrevistaId,
        prospectoId: entrevista.prospectoId,
        vacanteId: entrevista.vacanteId,
        fecha_entrevista: entrevista.fecha_entrevista,
        notas: entrevista.notas,
        reclutado: entrevista.reclutado
    }
}

const contractEntrevista = new ethers.Contract('0x5022399De45C8F4f915980a8C166E44E4f97cD75', EntrevistaContractABI, signer);
const contractVacante = new ethers.Contract('0xf5677020Efb9B2de7F881b7cF248e7100C04CaE8', VacanteContractABI, signer);
const contractProspecto = new ethers.Contract('0x51a2aE20Ede4cb452193B49849926CC7f76AcED7', ProspectoContractABI, signer);


    async function registrarEntrevista(prospectoId,vacanteId,fecha_entrevista,notas,reclutado){
        return await contractEntrevista.registrarEntrevista(prospectoId,vacanteId,fecha_entrevista,notas,reclutado)
    }

    async function obtenerEntrevista(entrevistaId){
        const entrevista = await contractEntrevista.obtenerEntrevistas(entrevistaId);
        return modeloEntrevista(entrevista)
    }

    async function obtenerTodasEntrevistas(){
        const todasEntrevistas = await contractEntrevista.obtenerTodasEntrevistas();
        return todasEntrevistas.map(modeloEntrevista);
    }

    async function actualizarEntrevista(entrevistaId,prospectoId,vacanteId,fecha_entrevista,notas,reclutado){
        return await contractEntrevista.actualizarEntrevista(entrevistaId,prospectoId,vacanteId,fecha_entrevista,notas,reclutado);
    }

    async function esEntrevista(entrevistaId){
        return await contractEntrevista.esEntrevista(entrevistaId)
    }
    async function esVacante(vacanteId){
        return await contractVacante.esVacante(vacanteId)
    }
    async function esProspectos(prospectoId){
        return await contractProspecto.esProspecto(prospectoId);
    }

module.exports = {registrarEntrevista,obtenerEntrevista,obtenerTodasEntrevistas,actualizarEntrevista,esProspectos,esVacante,esEntrevista};
