const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router()
router.get("/ping", cartController.Ping)
router.get("/:userId", cartController.getCartItems);
router.post('/:userId/items', cartController.addToCart);
router.delete('/:userId/items/:itemId', cartController.removeFromCart);
router.put('/:userId/items/:itemId', cartController.updateItemQtyInCart);
router.delete("/:userId/clear", cartController.clearCart);
// router.get("/:userId/total", cartController.getCartTotal);
router.post("/:userId/apply-discount", cartController.applyDiscountCode);

module.exports = router;