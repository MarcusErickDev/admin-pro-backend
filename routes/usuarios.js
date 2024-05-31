// Ruta /api/usuarios
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT ,getUsuarios);

router.post('/',
[
  check('nombre','el nombre es requerido').not().isEmpty(),
  check('password','el password es requerido').not().isEmpty(),
  check('email','el email es requerido').isEmail(),
  validarCampos,
] ,crearUsuario);

router.put('/:id', [
  validarJWT,
  check('nombre','el nombre es requerido').not().isEmpty(),
  check('email','el email es requerido').isEmail(),
  check('role','el role es requerido').not().isEmpty(),
  validarCampos
], actualizarUsuario);

router.delete('/:id',
  validarJWT,
  borrarUsuario
);


module.exports = router;