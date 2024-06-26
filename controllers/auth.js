const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {

    const usuarioDB = await Usuario.findOne({email});

    // Verificar email
    if ( !usuarioDB ) {
      return res.status(404).json({
        ok: false,
        msg: 'email no encontrado'
      });
    }

    // Generar web Token - JWT
    const token = await generarJWT( usuarioDB.id );

    // Verificar contraseña
    const validPassword = bcrypt.compareSync( password, usuarioDB.password );
    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'contraseña no valida'
      });
    }

    res.json({
      ok: true,
      token
    })
    
  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    })
    
  }

}


module.exports = {
  login
}