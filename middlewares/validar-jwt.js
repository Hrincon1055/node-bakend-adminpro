const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  // leer el token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

const validarAMIN_ROLE = async (req = request, res = response, next) => {
  const uid = req.uid;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no exite.",
      });
    }
    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "Notiene privilegios para hacer eso.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador.",
    });
  }
};

const validarAMIN_ROLE_o_MismoUSuario = async (
  req = request,
  res = response,
  next
) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no exite.",
      });
    }
    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "Notiene privilegios para hacer eso.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador.",
    });
  }
};
module.exports = {
  validarJWT,
  validarAMIN_ROLE,
  validarAMIN_ROLE_o_MismoUSuario,
};
