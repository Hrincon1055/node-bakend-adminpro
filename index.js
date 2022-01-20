const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");
const cors = require("cors");
// Crea el servidor de express
const app = express();
// Cors
app.use(cors());
// Lectura del body
app.use(express.json());
// db conexion
dbConnection();
// Directorio publico
app.use(express.static("public"));
// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/upload", require("./routes/uploads"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
