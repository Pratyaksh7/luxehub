const ShoopingCart = require("../models/ShoppingCart.model");

exports.Ping = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ status: "ok", message: "Shopping Cart Service is healthy." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addToCart = async(req, res, next) => {
  const {userId} = req.params;
  const {productId, quantity} = req.body;
  try {
    if(!productId || !quantity || quantity <= 0) return res.status(400).json({ status: 'error', message: "Invalid input"})
    let existingCart = await ShoopingCart.findOne({userId});
    if(!existingCart){
      existingCart = new ShoopingCart({
        userId,
        items: []
      })
    }

    const existingItemIndex = existingCart.items.findIndex(item => item.productId === productId);

    if(existingItemIndex !== -1){
      existingCart.items[existingItemIndex].quantity += quantity;
    } else{
      existingCart.items.push({ productId, quantity});
    }

    await existingCart.save();
    return res.status(201).json({ status: 'ok', message: "Item added to cart successfully.", data:existingCart})
  } catch (error) {
    console.log(error);
    next(error);
  }
}