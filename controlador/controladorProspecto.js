const { registrarProspecto,obtenerTodosProspectos,obtenerProspecto,actualizarProsepcto,esProspectos } = require('../modelos/modeloProspecto')
const { ethers } = require("hardhat");

const getInicio = async (req, res) => {
    res.render('inicioProspecto')
}

const getAltaProspecto = async (req, res) => {
    res.render('altaProspecto')
}

const postRegistrarProspecto = async (req, res) => {
    try{
        const nombre = req.body.nombre;
        const correo = req.body.correo;
        const fecha_registro = req.body.fecha_registro;
        const tx = await registrarProspecto(nombre,correo,fecha_registro);
        res.json({message: 'Prospecto Registrado',transaction: tx})
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}

const getObtenerProspecto = async (req, res) => {
    try{
        const prospecto_id = req.params.id
        const verificarProspecto = await esProspectos(prospecto_id)
        if(verificarProspecto){
            const prospecto = await obtenerProspecto(req.params.id);
            const prospecto_id = ethers.BigNumber.from(prospecto.prospectoId).toNumber()
            res.render('modificarProspecto',{prospecto_id:prospecto_id,nombre: prospecto.nombre,correo: prospecto.correo,fecha_registro:prospecto.fecha_registro })
        }
        else{
            res.status(404).json({message: "Prospecto no encontrado con ese ID"})
        }
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}

const getObtenerTodosProspectos = async (req, res) =>{
    try{
        const todosProspectos = await obtenerTodosProspectos();
        const prospectosProcesadas = todosProspectos.map(prospecto => {
            return {
                id: ethers.BigNumber.from(prospecto.prospectoId).toNumber(),
                nombre: prospecto.nombre,
                correo: prospecto.correo,
                fecha_registro: prospecto.fecha_registro
            };
        });
        res.render('todoProspecto',{prospectos : prospectosProcesadas})
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}

const putActualizarProspecto = async (req, res) =>{
    try{
        const prospecto_id = req.params.id
        const verificarProspecto = await esProspectos(prospecto_id)
        if(verificarProspecto){
            const nombre = req.body.nombre;
            const correo = req.body.correo;
            const fecha_registro = req.body.fecha_registro;
            const tx = await actualizarProsepcto(req.params.id, nombre, correo, fecha_registro)
            res.json({ message: `Prospecto ${req.params.id} actualizado`,transaction: tx })
        }
        else{
            res.status(404).json({message: "Prospecto no encontrado con ese ID"})
        }

    } catch (error){
        res.status(500).json({error: error.message})
    }
}

module.exports = { getInicio,getAltaProspecto,getObtenerProspecto,getObtenerTodosProspectos,postRegistrarProspecto,putActualizarProspecto }