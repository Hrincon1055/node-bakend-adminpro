const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");

const existeIdHospital = async (idHospital) => {
  const existeHospital = await Hospital.findById(idHospital);
  if (!existeHospital) {
    throw new Error(`El id de hospital no exite: ${idHospital}`);
  }
};
const existeIdMedico = async (idMedico) => {
  const existeMedico = await Medico.findById(idMedico);
  if (!existeMedico) {
    throw new Error(`El id de medico no exite: ${idMedico}`);
  }
};
const existeIdUsuario = async (idUsuario) => {
  const existeUsuario = await Usuario.findById(idUsuario);
  if (!existeUsuario) {
    throw new Error(`El id de usuario no exite: ${idUsuario}`);
  }
};
module.exports = {
  existeIdHospital,
  existeIdMedico,
  existeIdUsuario,
};
