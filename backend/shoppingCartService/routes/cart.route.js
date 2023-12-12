const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router()
router.get("/ping", cartController.Ping)
router.post('/:userId/items', cartController.addToCart);

module.exports = router;