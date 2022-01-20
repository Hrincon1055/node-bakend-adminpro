const { request, response } = require("express");
const Hospital = require("../models/hospital");

const existeIdHospital = async (idHospital) => {
  console.log("db-validators LINE 5 =>", idHospital);
  const existeHospital = await Hospital.findById(idHospital);
  console.log("db-validators LINE 7 =>", existeHospital);
  if (!existeHospital) {
    throw new Error(`El id de hospital no exite: ${idHospital}`);
  }
};
module.exports = {
  existeIdHospital,
};
