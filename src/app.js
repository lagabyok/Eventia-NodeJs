const express = require('express');
const app = express();
const rutas = require('../src/routes/index.routes.js');
const port = process.env.PORT || 8000;


app.use(express.static('public'));

app.use('/', rutas);

app.listen(port, () => {
    console.log(`Servidor arriba en el puerto http://localhost:${port}`);
});