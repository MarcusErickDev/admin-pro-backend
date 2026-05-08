// Ruta api/todo/
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

// const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios')
const { getTodo } = require('../controllers/busquedas')

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT ,getTodo);



module.exports = router;