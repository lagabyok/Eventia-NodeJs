const express = require('express');
const app = express();
const port = 3000 || process.env.PORT || 8000;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send("<h1>Eventia on Node JS</h1>");
// })


app.listen(port, () => {
    console.log(`Servidor arriba en el puerto http://localhost:${port}`);
});