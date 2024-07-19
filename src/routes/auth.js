const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const path = require('path');
require('dotenv').config();

const dbPath = path.join(__dirname, '../../usuariosweb.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  console.error('Error: JWT_SECRET no está definido en las variables de entorno.');
  process.exit(1);
}

function generarJWT(usuario) {
  return jwt.sign({ usuario }, secretKey, { expiresIn: '1h' });
}

router.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;
  console.log('Intento de login:', usuario, contraseña);

  if (!usuario || !contraseña) {
    return res.status(400).json({ error: 'Por favor, proporcione usuario y contraseña' });
  }

  const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
  db.get(query, [usuario, contraseña], (err, row) => {
    if (err) {
      console.error('Error al acceder a la base de datos:', err.message);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (row) {
      const token = generarJWT(row.usuario);
      console.log('Usuario autenticado:', row.usuario);
      res.json({ token });
    } else {
      console.log('Usuario o contraseña incorrectos');
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
  });
});

module.exports = router;
