const mongoose = require("mongoose");

const ShippingAddressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    shipping_address: [
      {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
    ],
  }
);

const ShippingAddress = new mongoose.model("ShippingAddress", ShippingAddressSchema);
module.exports = ShippingAddress;
