const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send("Token requerido");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("Token requerido");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido");
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
