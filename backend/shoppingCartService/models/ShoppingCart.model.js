const mongoose = require("mongoose");

const ShoppingCartSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    items: [
        {
            productId: {type: String, required: true},
            quantity: {type: Number, default: 1}
        }
    ],
    discountCode: {type: String}
})

const ShoppingCart = new mongoose.model('ShoppingCart', ShoppingCartSchema);
module.exports = ShoppingCart;