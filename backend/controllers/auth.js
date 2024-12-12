const dbLogin = require('../models/login');
const jwt = require('jsonwebtoken');

// Middleware auth
const auth = async (req, res, next) => {
    const token = req.query.token;
    const secretKey = "secret_key";

    if (!token) {
        return res.status(401).json({ error: "Token required" });
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);

        // Buscar al usuario en la base de datos
        const user = await dbLogin.findOne({ name: decodedToken.name });

        if (!user) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        req.token = token;
        req.user = user; // Adjunta el usuario a la solicitud para futuras operaciones
        console.log('authorize route');
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = auth; // Exporta la función correctamente
