const express = require('express');
const router = express.Router();
const {getObtenerVacante,getObtenerTodasVacantes,postRegistrarVacante,putActualizarVacante, getInicio,getAltaVacante } = require('../controlador/controladorVacante');
router.get('/',getInicio)
router.post('/', postRegistrarVacante);
router.post('/:id',putActualizarVacante)
router.get('/agregar',getAltaVacante)
router.get('/todas', getObtenerTodasVacantes);
router.get('/:id',getObtenerVacante);
module.exports = router;
