const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");
const { existeIdUsuario } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
/*
 * Ruta: /api/usuarios
 */
router.get("/", validarJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("password", "El password es obligatorio.").not().isEmpty(),
    check("email", "El email es obligatorio.").isEmail(),
    validarCampos,
  ],
  crearUsuario
);
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido de mongo.").isMongoId(),
    check("id").custom(existeIdUsuario),
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El email es obligatorio.").isEmail(),
    check("role", "El role es obligatorio.").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido de mongo.").isMongoId(),
    check("id").custom(existeIdUsuario),
  ],
  borrarUsuario
);
module.exports = router;
