// Hospitales
// ruta: 'api/hospitales'

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getHospitales,
        crearHospital,
        actualizarHospital,
        borrarHospital } = require('../controllers/hospitales')
// const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getHospitales);

router.post('/',
[
  validarJWT,
  check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
  validarCampos
] ,crearHospital);

router.put('/:id', 
[
  
], actualizarHospital);

router.delete('/:id',
  borrarHospital
);


module.exports = router;