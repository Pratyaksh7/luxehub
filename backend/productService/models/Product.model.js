const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    categories: [{ type: String }],
    price: { type: Number },
    currencies: [{ type: String }],
    stock_qty: { type: Number },
    manufacturer: { type: String },
    images: [{ type: String }],
    attributes: {
     type: Map, of: mongoose.Schema.Types.Mixed,
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
  },
  { timestamps: true }
);

// Add a text index on the fields you want to search using $text
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = new mongoose.model("Product", ProductSchema);
module.exports = Product;
