const { default: axios } = require("axios");
const { instance } = require("../server");
const crypto = require("crypto");
const Payment = require("../models/Payment.model");
const { PublishMessage, SubscribeMessage } = require("../utils");
const { ORDER_BINDING_KEY } = require("../config");

exports.Ping = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ status: "ok", message: "Payment Service is healthy." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.Checkout = async (req, res, next) => {
  const { amount, checkoutData } = req.body;
  try {
    const options = {
      amount: Math.round(amount) * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    const requestBody = {
      event: "CREATE_AN_ORDER",
      orderDetails: checkoutData,
      order,
    };

    PublishMessage(req.channel, ORDER_BINDING_KEY, JSON.stringify(requestBody));
    SubscribeMessage(req.channel, async (data) => {
      const parsedData = JSON.parse(data);
      if (
        parsedData?.event == "ALL_FIELDS_REQUIRED" &&
        parsedData?.status == "error"
      ) {
        return res.status(200).json({ success: false, order: null });
      } else if (
        parsedData?.event == "ORDER_CREATED" &&
        parsedData?.status == "ok"
      ) {
        return res.status(200).json({ success: true, order: parsedData?.data });
      }
    });
  } catch (error) {}
};

exports.paymentVerification = async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, error } =
    req.body;
  try {
    if (error?.description == "Payment failed") {
      const { payment_id, order_id } = JSON.parse(error?.metadata);
      const requestBody = {
        event: 'UPDATE_ORDER_STATUS',
        orderData: {
          order_id,
          status: "failed",
        },
      }

      PublishMessage(req.channel, ORDER_BINDING_KEY, JSON.stringify(requestBody));

      // metadata: '{"payment_id":"pay_NLoIVAQzTpLP7w","order_id":"order_NLoI4bzgTwBUCI"}'
      return res.redirect(`http://localhost:3000/paymentfailed?refence=${payment_id}`);
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      // Save the data in the database
      await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });

      const requestBody = {
        event: 'UPDATE_ORDER_STATUS',
        orderData: {
          order_id: razorpay_order_id,
          status: "completed",
        },
      }

      PublishMessage(req.channel, ORDER_BINDING_KEY, JSON.stringify(requestBody));

      return res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Payment is not authenticated." });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
