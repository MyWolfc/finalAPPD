const express = require('express')
const router = express.Router();
const {getObtenerEntrevista,getObtenerTodasEntrevista,postRegistraEntrevista,putActualizarEntrevista,getAltaEntrevista,getInciio} = require('../controlador/controladorEntrevista');

router.get('/',getInciio)
router.get('/todas',getObtenerTodasEntrevista);
router.get('/agregar',getAltaEntrevista);
router.post('/',postRegistraEntrevista)
router.get('/:id',getObtenerEntrevista);
router.post('/:id',putActualizarEntrevista);

module.exports = router