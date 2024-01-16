const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
});

const WishList = new mongoose.model("WishList", WishListSchema);
module.exports = WishList;
