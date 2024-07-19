const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        console.log('No se proporcionó un token.');
        return res.status(403).json({ error: 'No se proporcionó un token.' });
    }

    // Verificar si el token está en el formato correcto (Bearer token)
    if (!token.startsWith('Bearer ')) {
        console.log('Formato de token inválido. Debe ser Bearer token.');
        return res.status(403).json({ error: 'Formato de token inválido. Debe ser Bearer token.' });
    }

    // Extraer el token eliminando 'Bearer ' del inicio
    const authToken = token.split(' ')[1];

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                console.log('Token inválido.');
                return res.status(403).json({ error: 'Token inválido.' });
            }
            console.error('Fallo al autenticar el token:', err.message);
            return res.status(500).json({ error: 'Fallo al autenticar el token.' });
        }

        // Guardar el usuario decodificado en el objeto request para usarlo en las rutas protegidas
        req.user = decoded.usuario;
        console.log('Token decodificado:', decoded); // Imprimir el token decodificado por consola
        next(); // Continuar con la siguiente función middleware
    });
}

module.exports = verifyToken;
