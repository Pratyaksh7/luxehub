const express = require("express");
const paymentController = require("../controllers/payment.controller");
const router = express.Router()


router.get("/ping", paymentController.Ping)
router.post('/checkout', paymentController.Checkout);
router.post('/paymentverification', paymentController.paymentVerification);

module.exports = router;