const express = require("express");
const orderController = require("../controllers/order.controller");

const router = express.Router()
router.get("/ping", orderController.Ping)
router.post('/:userId', orderController.createOrder)
router.get('/:orderId', orderController.orderById);
router.get('/user/:userId', orderController.userOrders);

module.exports = router;