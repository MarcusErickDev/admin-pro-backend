const { response, json } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req,res) => {

  const usuarios = await Usuario.find({}, 'nombre email google role');

  res.json({
    ok: true,
    msg: usuarios
  });
}

const crearUsuario = async(req,res = response) => {

  const {email, password, nombre} = req.body;

  try {

    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }


    const usuario = new Usuario( req.body );

    // encryptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    // Generar web Token - JWT
    const token = await generarJWT( usuario.id )
  
    res.json({
      ok: true,
      usuario,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Error inesperado... revisar logs'
    });
  }

}

const actualizarUsuario = async(req,res = response) => {
  
  // TODO: validar token y comprobar si es usuario correcto
  
  const uid = req.params.id;
  
  try {

    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario no existe'
      })
    }

    const { password, google, email,...campos} = req.body;

    if (usuarioDB.email !== email){
      const existeEmail = await Usuario.findOne({email: req.body.email})
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'El correo ya está registrado'
        });
      }
    }
    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});


    res.json({
      ok:true,
      usuario: usuarioActualizado
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Error inesperado... revisar logs'
    });
  }
}

const borrarUsuario = async(req, res = response) => {
  
  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario no existe'
      })
    }

    await Usuario.findByIdAndDelete( uid );

    res.json({
      ok: true,
      msg: 'usuario eliminado'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}


module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
}