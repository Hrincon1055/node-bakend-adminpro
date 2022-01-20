const fs = require("fs");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");

const borrarImagen = (path) => {
  // const pathOll = `./uploads/medicos/${medico.img}`;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No es un médico.");
        return false;
      }
      const pathOllMedico = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathOllMedico);
      medico.img = nombreArchivo;
      await medico.save();
      return true;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No es un hospital.");
        return false;
      }
      const pathOllHospital = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathOllHospital);
      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No es un usuario.");
        return false;
      }
      const pathOllUsuario = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathOllUsuario);
      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
  }
};

module.exports = {
  actualizarImagen,
};
