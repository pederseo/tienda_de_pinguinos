const express = require('express');
const router = express.Router();
const dbLogin = require('../models/login');

const jwt = require('jsonwebtoken');

const secretKey = 'secret_key';

function encodeToken(user){
    return jwt.sign({name:user}, secretKey, { expiresIn: '1h' });
}

router.get('/', async (req, res) => {
    res.render('login');
});
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    // Validación de datos de entrada
    if (!name || !password) {
        return res.status(400).json({ message: "Incomplete data" });
    }

    try {
        // Buscar al usuario en la base de datos
        const user = await dbLogin.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: "Invalid name" });
        }

        // Verificar si la contraseña coincide
        const isPasswordValid = user.password === password;

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = encodeToken(name);

        res.redirect(`/product/view?token=${token}`);

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
