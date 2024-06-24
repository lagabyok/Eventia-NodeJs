const express = require("express");
const path = require("path");
const router = express.Router();
const mainController = require("../controllers/mainControllers");

router.get("/api/obtenerTipoEvento", mainController.obtenerTipoEvento);

// Rutas para mostrar las vistas
router.get("/espacios", mainController.obtenerEspacios);
router.get("/espacios/crear", mainController.mostrarFormularioEditar);
router.post("/espacios", mainController.crearEspacio);

//router.get("/espacios/crear", mainController.mostrarFormularioCrear);
router.get("/espacios/editar/:id", mainController.mostrarFormularioEditar);
/*
// Rutas para API
router.get("/espacios/:id", mainController.obtenerEspacioPorId);
router.post("/espacios", mainController.crearEspacio);
router.put("/espacios/:id", mainController.actualizarEspacio);
router.delete("/espacios/:id", mainController.eliminarEspacio);
*/
router.put("/espacios/:id", mainController.actualizarEspacio);
router.post("/espacios", mainController.crearEspacio);
router.delete("/espacios/:id", mainController.eliminarEspacio);

router.post("/api/crearContacto", mainController.crearContacto);

router.get("/contacto", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/contacto.html`));
});

router.get("/nosotros", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/nosotros.html`));
});

router.get("/eventos", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/eventos.html`));
});

router.use((req, res, next) => {
  res
    .status(400)
    .sendFile(path.resolve(__dirname + `./../../public/error.html`));
});

module.exports = router;
