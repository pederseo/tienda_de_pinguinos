const express = require('express');
const dbProducts = require('../models/products');
const mongoose = require('mongoose');
const router = express.Router();


const auth = require('../controllers/auth')

//_____________________________________________________________________
router.get('/view', auth, async (req, res) => {
    try {
        const viewProduct = await dbProducts.find();
        console.log('view products')
        res.render('productos', {viewProduct,"token": req.token})
    } catch (error) {
        res.status(500).json({message:"can not find products"})
    }
});

//_____________________________________________________________________
router.post('/add', auth, async (req, res) => {
    const { name, price, image } = req.body;
    
    // Validación de campos requeridos
    if (!name || !price || !image) {
        return res.status(400).json({ error: "incomplete data" });
    }

    try {
        // agregar nuevo producto
        const newProduct = await dbProducts.create({ name, price, image });
        console.log('new product has been added');
        return res.redirect(`/product/view?token=${req.token}`);

    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(400).json({ error: 'Error adding product' });
    }
});

//_____________________________________________________________________
router.post('/update', auth, async (req, res) => {
    const { id, name, price, image } = req.body; // Obtenemos el ID del cuerpo del formulario
    console.log('Datos recibidos:', id, name, price, image);

    if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        // Buscar y actualizar el producto
        const updatedProduct = await dbProducts.findByIdAndUpdate(
            id,
            { name, price, image },
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        console.log('Product updated successfully');
        return res.redirect(`/product/view?token=${req.token}`);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

//_____________________________________________________________________
router.post('/delete', auth, async (req, res) => {
    const { id } = req.body; // Obtener el ID de los parámetros de la ruta

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        // eliminar de la base de datos
        const deletedProduct = await dbProducts.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.redirect(`/product/view?token=${req.token}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});


module.exports = router;