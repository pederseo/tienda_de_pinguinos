require('dotenv').config(); // configuracion de .env
const express = require ('express');
const HOST = 'localhost'
const PORT = 5000;
const app = express();
const connectDB = require('./config/db'); 

const methodOverride = require('method-override');
app.use(methodOverride('_method')); // Permite cambiar el método HTTP desde el campo _method


// Configuración de EJS
app.set('view engine', 'ejs'); 
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

// importacion de rutas
const adminlogin = require('./routes/login')
const adminProducts = require('./routes/products');
const adminOrders = require('./routes/orders')

// conexion a mongo db
connectDB();

app.use(express.json());

// utilizar las rutas importadas
app.use('/product', adminProducts);
app.use('/order', adminOrders);
app.use('/login', adminlogin);

// correr servidor
app.listen(PORT,HOST,() => {
    console.log(`Servidor escuchando en ${HOST}:${PORT}`);
});
