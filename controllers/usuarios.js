const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req = request, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.countDocuments(),
  ]);
  return res.status(200).json({
    ok: true,
    usuarios,
    total,
  });
};
const crearUsuario = async (req = request, res = response) => {
  const { password, email } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado.",
      });
    }
    const usuario = new Usuario(req.body);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // guardar usuario
    await usuario.save();
    // generar token
    const token = await generarJWT(usuario.id);
    return res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log("usuarios LINE 33 =>", error);
    return res.status(500).json({
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
const actualizarUsuario = async (req = request, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con ese id.",
      });
    }
    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "El correo ya esta registrado.",
        });
      }
    }
    if (!usuarioDB.google) {
      campos.email = email;
    } else if (usuarioDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuarios de google no pueden cambiar el correo..",
      });
    }
    //! TODO: validar token y comprobar usuario
    //? Acutalizaciones
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
const borrarUsuario = async (req = request, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con ese id.",
      });
    }
    await Usuario.findOneAndDelete(uid);
    return res.status(200).json({
      ok: true,
      msg: "Usuario eliminado.",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
