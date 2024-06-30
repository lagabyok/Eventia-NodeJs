const express = require("express");
const path = require("path");
const router = express.Router();
const mainController = require("../controllers/mainControllers");
const verifyToken = require("../middleware/authMiddleware");

// Rutas estáticas
router.get("/contacto", (req, res) => {
  res.sendFile(path.resolve(__dirname, `../../public/contacto.html`));
});

router.get("/nosotros", (req, res) => {
  res.sendFile(path.resolve(__dirname, `../../public/nosotros.html`));
});

router.get("/eventos", (req, res) => {
  res.sendFile(path.resolve(__dirname, `../../public/eventos.html`));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, `../../public/login.html`));
});



// Rutas dinámicas protegidas por token
router.get("/espacios", verifyToken, mainController.obtenerEspacios);
router.get("/espacios/crear", verifyToken, mainController.mostrarFormularioEditar);
router.post("/espacios", verifyToken, mainController.crearEspacio);
router.get("/espacios/editar/:id", verifyToken, mainController.mostrarFormularioEditar);
router.put("/espacios/:id", verifyToken, mainController.actualizarEspacio);
router.delete("/espacios/:id", verifyToken, mainController.eliminarEspacio);

// API endpoints
router.post("/api/crearContacto", mainController.crearContacto);
router.get("/api/obtenerTipoEvento", mainController.obtenerTipoEvento);

module.exports = router;
