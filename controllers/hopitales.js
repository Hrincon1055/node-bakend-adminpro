const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const Hospital = require("../models/hospital");
const { generarJWT } = require("../helpers/jwt");

const getHospitales = async (req = request, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");
  return res.status(200).json({
    ok: true,
    hospitales,
  });
};
const crearHospital = async (req = request, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();
    return res.status(200).json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
const actualizarHospital = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "PUT",
  });
};
const borrarHospital = async (req = request, res = response) => {
  return res.status(200).json({
    ok: true,
    msg: "DELETE",
  });
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
