const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    shipping_address: [
      {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
    ],
    contact_details: {
      email: { type: String },
      phone: { type: String },
    },
    status: { type: String, default: "pending" }, // Order status (pending, confirmed, shipped, etc.)
    total_price: { type: Number },
    first_name: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model("Order", OrderSchema);
module.exports = Order;
