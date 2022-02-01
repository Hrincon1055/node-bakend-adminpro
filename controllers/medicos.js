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
const getMedicoById = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");
    return res.status(200).json({
      ok: true,
      medico,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
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
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
const actualizarMedico = async (req = request, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };
    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      {
        new: true,
      }
    );
    return res.status(200).json({
      ok: true,
      msg: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error Inesperado... revisar logs.",
    });
  }
};
const borrarMedico = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    await Medico.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: `Se borro el medico con id: ${id}`,
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
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
};
