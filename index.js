const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");
const cors = require("cors");
// Crea el servidor de express
const app = express();
// Cors
app.use(cors());
// db conexion
dbConnection();
// Rutas
app.get("/", (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: "Hola Mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
