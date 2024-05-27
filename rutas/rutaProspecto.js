const express = require('express');
const router = express.Router();
const {getObtenerProspecto,getObtenerTodosProspectos,postRegistrarProspecto,putActualizarProspecto,getAltaProspecto,getInicio} = require('../controlador/controladorProspecto');


router.post('/', postRegistrarProspecto);
router.get('/',getInicio)
router.get('/todas', getObtenerTodosProspectos);
router.get('/agregar',getAltaProspecto)
router.get('/:id',getObtenerProspecto);
router.post('/:id', putActualizarProspecto);

module.exports = router;
