const { request, response } = require("express");

const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");

const getTodo = async (req = request, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  return res.status(200).json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentoColeccion = async (req = request, res = response) => {
  const busqueda = req.params.busqueda;
  const tabla = req.params.tabla;
  const regex = new RegExp(busqueda, "i");
  let data = [];
  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;
    default:
      return res.status(404).json({
        ok: false,
        msg: "La tabal de busqueda tiene que ser usuarios/medicos/hospitales",
      });
  }

  // const [usuarios, medicos, hospitales] = await Promise.all([
  //   Usuario.find({ nombre: regex }),
  //   Medico.find({ nombre: regex }),
  //   Hospital.find({ nombre: regex }),
  // ]);

  return res.status(200).json({
    ok: true,
    data,
  });
};

module.exports = {
  getTodo,
  getDocumentoColeccion,
};
