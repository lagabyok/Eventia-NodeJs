const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const indexRouter = require("./src/routes/index.routes.js");
const authRoutes = require("./src/routes/auth.js");
const verifyToken = require('./src/middleware/authMiddleware.js');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

// Configuración del motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos usuariosweb.db
const dbPath = path.join(__dirname, "./usuariosweb.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Rutas
app.use("/", indexRouter); // Rutas generales
app.use("/auth", authRoutes); // Rutas de autenticación

// Middleware para rutas protegidas por token
app.use('/espacios', verifyToken, indexRouter);

// Ruta GET específica para /espacios
app.get('/public/espacios.html', (req, res) => {
  res.send('Bienvenido a la página de Espacios');
});

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
