// Medicos
// ruta: 'api/medicos'

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getMedicos,
        crearMedico,
        actualizarMedico,
        borrarMedico } = require('../controllers/medicos')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);

router.post('/',
[
  
] ,crearMedico);

router.put('/:id', 
[
  
], actualizarMedico);

router.delete('/:id',
  borrarMedico
);


module.exports = router;