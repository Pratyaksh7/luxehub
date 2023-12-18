const Order = require("../models/Order.model");

exports.Ping = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ status: "ok", message: "Order Service is healthy." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const {
      items,
      shipping_address,
      contact_details,
      total_price,
      first_name,
    } = req.body;
    if (
      !userId ||
      !items ||
      !shipping_address ||
      !contact_details ||
      !total_price ||
      !first_name
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required." });
    }

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      shipping_address,
      contact_details,
      total_price,
      first_name,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json({
      status: "ok",
      message: "Order is Placed successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.orderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId)
      return res
        .status(400)
        .json({ status: "error", message: "Order ID is required." });

    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ status: "error", message: "Order not found." });

    return res
      .status(200)
      .json({ status: "ok", message: "Order found.", data: order });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.userOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ status: "error", message: "User ID is required." });
    const userOrders = await Order.find({ userId });
    if (!userOrders)
      return res
        .status(400)
        .json({ status: "error", message: "No User Orders found." });
    return res
      .status(200)
      .json({ status: "ok", message: "User orders found.", data: userOrders });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
