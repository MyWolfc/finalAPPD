const { registrarEntrevista,obtenerEntrevista,obtenerTodasEntrevistas,actualizarEntrevista,esEntrevista,esProspectos,esVacante } = require('../modelos/modeloEntrevista')
const { ethers } = require("hardhat")


const getInciio = async (req, res) =>{
    res.render('inicioEntrevista')
}

const getAltaEntrevista = async (req,res) =>{
    res.render('altaEntrevista')
}

const postRegistraEntrevista = async (req, res) =>{
    try{
        const prospectoId = req.body.prospectoId;
        const vacanteId = req.body.vacanteId;
        const verificarProspecto = await esProspectos(prospectoId);
        const verificarVacante = await esVacante(vacanteId);
        if(verificarProspecto && verificarVacante ){
            const fecha_entrevista = req.body.fecha_entrevista;
            const notas = req.body.notas;
            const reclutado = req.body.reclutado;
            const tx = await registrarEntrevista(prospectoId,vacanteId,fecha_entrevista,notas,reclutado);
            res.json({message: 'Entrevista Registrada',transaction: tx})
        }
        else{
            res.status(404).json({message: "Prospecto o vacante con ID invalido"})
        }
       
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}

const getObtenerEntrevista = async (req, res) =>{
    try {
        const entrevista_id = req.params.id;
        const verificarEntrevista = await esEntrevista(entrevista_id)
        if(verificarEntrevista){
            const entrevista = await obtenerEntrevista(entrevista_id)
            res.render('modificarEntrevista',{id: entrevista_id,prospectoId:entrevista.prospectoId,vacanteId:entrevista.vacanteId,fecha_entrevista:entrevista.fecha_entrevista,notas:entrevista.notas,reclutado:entrevista.reclutado})
        }
        else{
            res.status(404).json({message: "Entrevista no encontrada con ese ID"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const getObtenerTodasEntrevista = async (req, res) =>{
    try {
        const todasEntrevistas = await obtenerTodasEntrevistas();
        const entrevistaProcesadas = todasEntrevistas.map(entrevista => {
            return {
                id: ethers.BigNumber.from(entrevista.entrevistaId).toNumber(),
                prospectoId : entrevista.prospectoId,
                vacanteId: entrevista.vacanteId,
                fecha_entrevista: entrevista.fecha_entrevista,
                notas: entrevista.notas,
                reclutado: entrevista.reclutado
            };
        });
        res.render('todasEntrevistas',{entrevistas: entrevistaProcesadas})
        } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const putActualizarEntrevista = async (req, res) =>{
    const entrevistaId = req.params.id;
    const verificarEntrevista = await esEntrevista(entrevistaId);
    if (verificarEntrevista) {
        const prospectoId = req.body.prospectoId;
        const vacanteId = req.body.vacanteId;
        const verificarProspecto = await esProspectos(prospectoId);
        const verificarVacante = await esVacante(vacanteId);
        if (verificarProspecto && verificarVacante) {
            const fecha_entrevista = req.body.fecha_entrevista;
            const notas = req.body.notas;
            const reclutado = req.body.reclutado;
            const tx = await actualizarEntrevista(entrevistaId,prospectoId,vacanteId,fecha_entrevista,notas,reclutado);
            res.json({ message: `Entrevista ${req.params.id} actualizada`,transaction: tx })
        } else {
            res.status(404).json({message: "Prospecto o vacante con ID invalido"})
        }
    } else {
        res.status(404).json({message: "Entrevista no encontrada con ese ID"})

    }
   
}

module.exports = {getInciio,getAltaEntrevista,postRegistraEntrevista,getObtenerEntrevista,getObtenerTodasEntrevista,putActualizarEntrevista}