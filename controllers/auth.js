const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

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
    //! TODO: Generar token -
    const token = await generarJWT(usuarioDB.id);
    return res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};

module.exports = {
  login,
};