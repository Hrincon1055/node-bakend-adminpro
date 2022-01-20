const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const Medico = require("../models/medico");
const { generarJWT } = require("../helpers/jwt");

const getMedicos = async (req = request, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre");

  return res.status(200).json({
    ok: true,
    medicos,
  });
};
const crearMedico = async (req = request, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });
  try {
    const medicoDB = await medico.save();
    return res.status(200).json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
const actualizarMedico = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "PUT",
  });
};
const borrarMedico = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "DELETE",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
