const { registrarVacante, obtenerTodasVacantes,obtenerVacante,actualizarVacante,esVacante} = require('../modelos/modeloVacante');
const { ethers } = require("hardhat");

const getInicio = async (req, res) => {
    res.render('inicioVacante');
}

const getAltaVacante = async (req, res)=> {
    res.render('altaVacante')
}

const postRegistrarVacante = async (req, res) => {
    try {
        const area = req.body.area;
        const sueldo = req.body.sueldo;
        const activo = req.body.activo;
        console.log(req.body)
        console.log(area,sueldo,activo)
        const tx = await registrarVacante(area, sueldo, activo);
        res.json({ message: 'Vacante registrada', transaction: tx });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getObtenerVacante = async (req, res) => {
    try {
        const vacante_id = req.params.id;
        const verficarID = await esVacante(vacante_id)
        if(verficarID){
            const vacante = await obtenerVacante(vacante_id);
            console.log(vacante.vacanteId)
            console.log(ethers.BigNumber.from(vacante.vacanteId).toNumber())
            console.log(vacante.vacanteId.type)
            res.render('modificarVacante',{vacante_id:vacante_id,area: vacante.area,sueldo:vacante.sueldo,activo:vacante.activo})
        }
        else{
            res.status(404).json({message: "No existe una vacante con ese ID"})
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getObtenerTodasVacantes = async (req, res) => {
    try {
        const todasVacantes = await obtenerTodasVacantes();
        const vacantesProcesadas = todasVacantes.map(vacante => {
            return {
                id: ethers.BigNumber.from(vacante.vacanteId).toNumber(),
                area: vacante.area,
                sueldo: vacante.sueldo,
                activo: vacante.activo
            };
        });
        res.render('todasVacantes', { vacantes: vacantesProcesadas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const putActualizarVacante = async (req, res) => {
    try {
        const vacante_id = req.params.id;
        const verficarID = await esVacante(vacante_id)
        if(verficarID){
            const area = req.body.area;
            const sueldo = req.body.sueldo;
            const activo = req.body.activo;
            const tx = await actualizarVacante(req.params.id, area, sueldo, activo);
            res.json({ message: `Vacante ${req.params.id} actualizada`, transaction: tx });
        }
        else{
            res.status(404).json({message: "No existe una vacante con ese ID"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getInicio,
    getAltaVacante,
    getObtenerVacante,
    getObtenerTodasVacantes,
    postRegistrarVacante,
    putActualizarVacante,
    postRegistrarVacante,
};
