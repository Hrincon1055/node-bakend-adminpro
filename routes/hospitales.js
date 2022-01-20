const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hopitales");
const { existeIdHospital } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
/*
 * Ruta: /api/hospitales
 */
router.get("/", validarJWT, getHospitales);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es obligatorio.").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es obligatorio.").not().isEmpty(),
    check("id", "No es un ID valido de mongo.").isMongoId(),
    check("id").custom(existeIdHospital),
    validarCampos,
  ],
  actualizarHospital
);
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido de mongo.").isMongoId(),
    check("id").custom(existeIdHospital),
    validarCampos,
  ],
  borrarHospital
);
module.exports = router;
