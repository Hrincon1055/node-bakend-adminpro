const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");
const {
  existeIdHospital,
  existeIdMedico,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
/*
 * Ruta: /api/medicos
 */
router.get("/", validarJWT, getMedicos);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio.").not().isEmpty(),
    check("hospital", "El ID del hospital es obligatorio.").not().isEmpty(),
    check("hospital", "No es un ID valido de mongo.").isMongoId(),
    check("hospital").custom(existeIdHospital),
    validarCampos,
  ],
  crearMedico
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido de mongo.").isMongoId(),
    check("id").custom(existeIdMedico),
    check("nombre", "El nombre del medico es obligatorio.").not().isEmpty(),
    check("hospital", "El ID del hospital es obligatorio.").not().isEmpty(),
    check("hospital", "No es un ID valido de mongo.").isMongoId(),
    check("hospital").custom(existeIdHospital),
    validarCampos,
  ],
  actualizarMedico
);
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido de mongo.").isMongoId(),
    check("id").custom(existeIdMedico),
    validarCampos,
  ],
  borrarMedico
);
module.exports = router;
