const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    client: {
        name: { type: String, required: [true, 'El nombre del cliente es obligatorio'] },
        direction: { type: String, required: [true, 'La dirección del cliente es obligatoria'] }
    },
    products: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: [true, 'La cantidad es obligatoria'], min: [1, 'La cantidad debe ser al menos 1'] },
            subtotal: { type: Number, required: [true, 'El subtotal es obligatorio'], min: [0, 'El subtotal no puede ser negativo'] }
        }
    ],
    total: { type: Number, default: 0 }, // Se calcula automáticamente
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'cancelled'], 
        default: 'pending' 
    }
});

// Middleware para calcular el total antes de guardar
OrderSchema.pre('save', function (next) {
    this.total = this.products.reduce((acc, product) => acc + product.subtotal, 0);
    next();
});

// Middleware para recalcular el total antes de actualizar
OrderSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.products) {
        update.total = update.products.reduce((acc, product) => acc + product.subtotal, 0);
    }
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
