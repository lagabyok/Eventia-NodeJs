const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/contacto', (req, res) => {
    res.sendFile(path.resolve(__dirname  + `./../../public/contacto.html`));
})

router.get('/nosotros', (req, res) => {
    res.sendFile(path.resolve(__dirname + `./../../public/nosotros.html`));
})

router.get('/eventos', (req, res) => {
    res.sendFile(path.resolve(__dirname + `./../../public/eventos.html`));
})

router.use((req, res, next) => {
    res.status(400).sendFile(path.resolve(__dirname + `./../../public/error.html`))
});


module.exports = router;