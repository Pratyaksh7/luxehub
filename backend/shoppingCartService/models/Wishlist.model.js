const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      id: {type: String, required: true},
      name: { type: String, required: true },
      description: { type: String },
      categories: [{ type: String }],
      price: { type: Number, required: true },
      currencies: [{ type: String }],
      stock_qty: { type: Number },
      manufacturer: { type: String },
      images: [{ type: String }],
      attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
      },
      tags: [{ type: String }],
      rating: { type: Number },
      reviews: [
        {
          userid: { type: String },
          comment: { type: String },
          rating: { type: Number },
        },
      ],
      quantity: { type: Number, default: 1 },
    },
  ],
});

const WishList = new mongoose.model("WishList", WishListSchema);
module.exports = WishList;
