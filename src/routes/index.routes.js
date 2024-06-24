const express = require("express");
const path = require("path");
const router = express.Router();
const mainController = require("../controllers/mainControllers");
const verifyToken = require("../middleware/authMiddleware");

// Rutas para mostrar las vistas
router.get("/espacios", verifyToken, mainController.obtenerEspacios);
router.get(
  "/espacios/crear",
  verifyToken,
  mainController.mostrarFormularioEditar
);
router.post("/espacios", verifyToken, mainController.crearEspacio);
router.get(
  "/espacios/editar/:id",
  verifyToken,
  mainController.mostrarFormularioEditar
);
router.put("/espacios/:id", verifyToken, mainController.actualizarEspacio);
router.post("/espacios", verifyToken, mainController.crearEspacio);
router.delete("/espacios/:id", verifyToken, mainController.eliminarEspacio);

router.post("/api/crearContacto", mainController.crearContacto);
router.get("/api/obtenerTipoEvento", mainController.obtenerTipoEvento);

router.get("/contacto", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/contacto.html`));
});

router.get("/nosotros", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/nosotros.html`));
});

router.get("/eventos", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/eventos.html`));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/login.html`));
});
router.use((req, res, next) => {
  res
    .status(400)
    .sendFile(path.resolve(__dirname + `./../../public/error.html`));
});

module.exports = router;
