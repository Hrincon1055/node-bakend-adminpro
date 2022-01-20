const fs = require("fs");
const { request, response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req = request, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "El tipo debe ser hospitales/medicos/usuarios",
    });
  }
  // Validar que exista un archivo.
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningún archivo.",
    });
  }
  // procesar la imagen....
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extecionArchivo = nombreCortado[nombreCortado.length - 1];
  // validar extencion
  const extencionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extencionesValidas.includes(extecionArchivo)) {
    return res.status(400).json({
      ok: true,
      msg: "Los tipos de exenciones permitidas son: png - jpg - jpeg - gif ",
    });
  }
  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extecionArchivo}`;
  // Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al guardar la imagen.",
      });
    }
    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);
    return res.status(200).json({
      ok: true,
      msg: "Archivo guardado",
      nombreArchivo,
    });
  });
};
const retornaImagen = (req = request, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "El tipo debe ser hospitales/medicos/usuarios",
    });
  }
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  // Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};
module.exports = {
  fileUpload,
  retornaImagen,
};
