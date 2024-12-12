const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')
const dbOrders = require('../models/orders')

router.get('/view',auth, async (req, res) =>{
    try {
        const orders = await dbOrders.find();
        console.log('view orders');
        
        res.render('order', { orders ,"token":req.token} );

    } catch (error) {
        res.status(500).json({message:"can not find products"})
    }
});



router.post('/status', auth, async (req, res) => {
    const { id, status } = req.body;
    try {
        const updatedOrder = await dbOrders.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true, runValidators: true }
        );
        if (!updatedOrder) return res.status(404).json({ error: 'Orden no encontrada' });
        return res.redirect(`/order/view?token=${req.token}`);

    } catch (error) {
        console.error('Error al actualizar el estado de la orden:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;