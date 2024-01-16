const express = require("express");
const orderController = require("../controllers/order.controller");

const router = express.Router()
router.get("/ping", orderController.Ping)
// router.post('/:userId', orderController.createOrder)
router.get('/:orderId', orderController.orderById);
router.get('/user/:userId', orderController.userOrders);
router.put('/:orderId', orderController.updateOrder)
router.delete('/:orderId', orderController.deleteOrder)
router.get('/status/:status', orderController.ordersByStatus)
router.get('/shippingAddresses/:userId', orderController.shippingAddressesList);
// router.patch("/orderStatus", orderController.updateOrderStatus)

module.exports = router;