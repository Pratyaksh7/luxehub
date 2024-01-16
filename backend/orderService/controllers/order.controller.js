const { default: axios } = require("axios");
const Order = require("../models/Order.model");
const { SubscribeMessage, CreateChannel, PublishMessage } = require("../utils");
const { PAYMENT_BINDING_KEY, CART_BINDING_KEY } = require("../config");
const ShippingAddress = require("../models/ShippingAddress.model");

async function init() {
  const channel = await CreateChannel();

  const service = async (data) => {
    try {
      const parsedData = JSON.parse(data);
      switch (parsedData?.event) {
        case "CREATE_AN_ORDER":
          await createOrder(parsedData?.orderDetails, parsedData?.order);
          break;

        case "UPDATE_ORDER_STATUS":
          await updateOrderStatus(parsedData?.orderData);
          break;

        default:
          return null;
      }
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  };

  SubscribeMessage(channel, service);

  //------------ Functions to perform certain task -------------
  //Function to create order
  async function createOrder(orderDetails, order) {
    try {
      const {
        items,
        shipping_address,
        contact_details,
        total_price,
        first_name,
      } = orderDetails.orderDetails;
      const userId = orderDetails?.userId;
      // console.log({ orderDetails, order });
      if (
        !userId ||
        !items ||
        !shipping_address ||
        !contact_details ||
        !total_price ||
        !first_name
      ) {
        PublishMessage(
          channel,
          PAYMENT_BINDING_KEY,
          JSON.stringify({
            event: "ALL_FIELDS_REQUIRED",
            status: "error",
            message: "All fields are required.",
          })
        );
      } else {
        // Save or update the ShippingAddress
        await saveOrUpdateShippingAddress(userId, shipping_address);

        // Create a new order
        const newOrder = new Order({
          userId,
          items,
          shippingAddress: shipping_address,
          contact_details,
          total_price,
          first_name,
          razorpay_order_data: order,
        });
        await newOrder.save();

        // Clear the cart from Shopping Cart Microservice
        PublishMessage(
          channel,
          CART_BINDING_KEY,
          JSON.stringify({
            event: "CLEAR_THE_CART",
            userId: userId,
          })
        );

        // Order created Successful
        PublishMessage(
          channel,
          PAYMENT_BINDING_KEY,
          JSON.stringify({
            event: "ORDER_CREATED",
            status: "ok",
            message: "Order is Placed successfully",
            data: order,
          })
        );
      }
    } catch (error) {
      console.log(error);
      // next(error);
    }
  }

  // Function to save or update ShippingAddress
  async function saveOrUpdateShippingAddress(userId, newAddress) {
    const existingShippingAddress = await ShippingAddress.findOne({ userId });

    if (existingShippingAddress) {
      // If it exists, update the existing document by adding the new address with a unique street
      // Check if the new address's street already exists in the array
      const isDuplicateStreet = existingShippingAddress.shipping_address.some(
        (existingAddress) => {
          return existingAddress.street === newAddress.street;
        }
      );

      // Add the new address only if the street doesn't already exist
      if (!isDuplicateStreet) {
        existingShippingAddress.shipping_address.push(newAddress);
        return existingShippingAddress.save();
      } else {
        // Handle case where the street already exists (optional)
        return existingShippingAddress;
      }
    } else {
      // If it doesn't exist, create a new document with the unique street
      const newShippingAddress = new ShippingAddress({
        userId,
        shipping_address: [newAddress],
      });
      return newShippingAddress.save();
    }
  }

  // Function to update Order status
  async function updateOrderStatus(orderData) {
    try {
      const existingOrder = await Order.find({
        "razorpay_order_data.id": orderData?.order_id,
      });
      existingOrder[0].status = orderData?.status;

      await existingOrder[0]?.save();
    } catch (error) {
      console.log(error);
    }
  }
}

init();

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
    if (userOrders.length < 1)
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

exports.updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const updatedOrderDetails = req.body;

    if (!orderId)
      return res
        .status(400)
        .json({ status: "error", message: "Order ID is required." });
    if (!updatedOrderDetails || Object.keys(updatedOrderDetails).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Updated order details are required.",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updatedOrderDetails,
      {
        new: true, // Return the modified document rather than the original
      }
    );

    if (!updatedOrder)
      return res
        .status(404)
        .json({ status: "error", message: "Order not found." });
    return res.status(200).json({
      status: "ok",
      message: "Order updated successfully.",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!orderId)
      return res
        .status(400)
        .json({ status: "error", message: "Order ID is required." });

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder)
      return res
        .status(404)
        .json({ status: "error", message: "Order not found." });

    return res.status(200).json({
      status: "ok",
      message: "Order deleted successfully.",
      data: deletedOrder,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ordersByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    if (!status)
      return res
        .status(400)
        .json({ status: "error", message: "Status is required." });
    const ordersByStatus = await Order.find({ status });
    if (ordersByStatus.length < 1)
      return res
        .status(400)
        .json({ status: "error", message: "Orders not found.", data: [] });
    return res
      .status(200)
      .json({ status: "ok", message: "Data found.", data: ordersByStatus });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*
    Task: Done - 1. Seperate the address section in a new model. 
          Done - 2, Store the billing address while creating an order
          Done - 3. Get the List of all the shipping addresses for a user
          4. Make it clickable on the checkout page to autofill the address


*/

exports.shippingAddressesList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(200)
        .json({ status: "error", message: "User ID is required." });
    const shippingAddress = await ShippingAddress.find({ userId });
    if (shippingAddress.length < 1)
      return res
        .status(200)
        .json({ status: "error", message: "No Shipping Addresses found" });
    return res
      .status(200)
      .json({
        status: "ok",
        message: "Shipping Addresses found.",
        data: shippingAddress[0]?.shipping_address,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
