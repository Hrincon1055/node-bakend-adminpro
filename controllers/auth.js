const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontend } = require("../helpers/menu.frontend");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //? Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado.",
      });
    }
    //? Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no valido.",
      });
    }
    const token = await generarJWT(usuarioDB.id);
    return res.status(200).json({
      ok: true,
      token,
      menu: getMenuFrontend(usuarioDB.role),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
const googleSigIn = async (req = request, res = response) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      usuario = usuarioDB;
      usuario.google = true;
    }
    // Guardar en DB
    await usuario.save();
    const token = await generarJWT(usuario.id);
    return res.status(200).json({
      ok: true,
      token,
      menu: getMenuFrontend(usuario.role),
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no es correcto.",
    });
  }
};
const renewToken = async (req = request, res = response) => {
  const uid = req.uid;
  const usuario = await Usuario.findById(uid, "nombre email img role google");
  const token = await generarJWT(uid);
  return res.status(200).json({
    ok: true,
    token,
    usuario,
    menu: getMenuFrontend(usuario.role),
  });
};
module.exports = {
  login,
  googleSigIn,
  renewToken,
};
