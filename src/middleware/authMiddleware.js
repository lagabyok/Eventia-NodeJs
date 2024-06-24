const jwt = require("jsonwebtoken");
const SECRET_KEY = "ZXN0MGVzdW5hcGFzc3cwcmRwNHI0dDBrM24=";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader);

  if (!authHeader) {
    return res.status(403).send("Token requerido");
  }

  const token = authHeader.split(" ")[1];
  console.log("Token recibido en el middleware:", token);

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
