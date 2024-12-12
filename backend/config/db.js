const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);  // No es necesario incluir esas opciones
        console.log(`MongoDB conectado: ${conn.connection.host}:${conn.connection.port}`);
    } catch (err) {
        console.error(`Error al conectar a MongoDB: ${err.message}`);
        process.exit(1); // Detener el proceso si la conexión falla
    }
};

module.exports = connectDB;