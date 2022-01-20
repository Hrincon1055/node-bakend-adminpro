const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

const existeIdHospital = async (idHospital) => {
  const existeHospital = await Hospital.findById(idHospital);
  if (!existeHospital) {
    throw new Error(`El id de hospital no exite: ${idHospital}`);
  }
};
const existeIdMedico = async (idMedico) => {
  console.log("db-validators LINE 11 =>", idMedico);
  const existeMedico = await Medico.findById(idMedico);
  if (!existeMedico) {
    throw new Error(`El id de medico no exite: ${idMedico}`);
  }
};
module.exports = {
  existeIdHospital,
  existeIdMedico,
};
