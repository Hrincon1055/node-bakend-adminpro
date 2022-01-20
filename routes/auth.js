const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSigIn, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
/*
 * Ruta: /api/auth
 */
router.post(
  "/",
  [
    check("email", "El nombre es obligatorio.").not().isEmpty(),
    check("password", "El password es obligatorio.").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [check("token", "El token es obligatorio.").not().isEmpty(), validarCampos],
  googleSigIn
);
router.get("/renew", validarJWT, renewToken);

module.exports = router;
