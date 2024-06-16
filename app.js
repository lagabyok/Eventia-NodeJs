const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send("<h1>Eventia on Node JS</h1>");
// })

app.get('/contacto', (req, res) => {
    res.sendFile(path.resolve(__dirname  + `/public/contacto.html`));
})

app.get('/nosotros', (req, res) => {
    res.sendFile(path.resolve(__dirname + `/public/nosotros.html`));
})

app.get('/eventos', (req, res) => {
    res.sendFile(path.resolve(__dirname + `/public/eventos.html`));
})

app.use((req, res, next) => {
    res.status(400).send('<h1>Recurso no encontrado!</h1>')
});

app.listen(port, () => {
    console.log(`Servidor arriba en el puerto http://localhost:${port}`);
});