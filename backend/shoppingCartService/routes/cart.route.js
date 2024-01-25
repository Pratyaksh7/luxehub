const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router()
router.get("/ping", cartController.Ping)
router.get("/:userId", cartController.getCartItems);
router.get("/:userId/total", cartController.getCartTotal);
router.get("/:userId/wishlist", cartController.getWishList);

router.post('/:userId/items', cartController.addToCart);
router.post("/:userId/wishlist", cartController.addToWishList);
router.post("/:userId/apply-discount", cartController.applyDiscountCode);

router.put('/:userId/items', cartController.updateItemQtyInCart);

router.delete('/:userId/items/:productId', cartController.removeFromCart);
// router.delete("/:userId/clear", cartController.clearCart);
router.delete('/:userId/wishlist/:productId', cartController.removeFromWishList);


module.exports = router;