require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { setupLogging } = require("./logging");
const { ROUTES } = require("./routes");
const { setupProxies } = require("./proxy");
const { setupRateLimit } = require("./ratelimit");
const { default: axios } = require("axios");

const app = express();
app.use(cors());
const PORT = 5000;

async function getCartItemsPrice(cartItems) {
  const apiBaseURL = "http://localhost:3002/products"; // Replace with your actual API endpoint

  const promises = cartItems && cartItems?.map(async (cartItem) => {
    const { _id, quantity } = cartItem;
    const apiUrl = `${apiBaseURL}/${_id}`;

    try {
      const response = await axios.get(apiUrl);

      // Process the response as needed
      const productData = response.data;
      // console.log(`Product ${_id} API response:`, productData);
      return { _id, totalPrice: productData.data.price * quantity };
    } catch (error) {
      console.error(`Error fetching product ${_id}:`, error.message);
    }
  });

  // Wait for all promises to resolve
  return await Promise.all(promises);
}

app.get("/carts/:userId/total", async (req, res) => {
  const { userId } = req.params;
  try {
    const { data } = await axios.get(`http://localhost:3003/carts/${userId}`);
    if (data?.data?.items?.length < 1)
      return res
        .status(400)
        .json({ status: "error", message: "No items in the cart.", data: [] });
    const productsPrices = data?.data && (await getCartItemsPrice(data?.data))
      .reduce((acc, item) => acc + item.totalPrice, 0)
      .toFixed(4);
    return res.status(200).json({
      status: "ok",
      message: "Total cost retrieved successfully",
      data: productsPrices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

async function getProductDetails(wishlistItems) {
  const apiBaseURL = "http://localhost:3002/products";

  const promises = wishlistItems.map(async (wishistItem) => {
    const { productId } = wishistItem;
    const apiUrl = `${apiBaseURL}/${productId}`;

    try {
      const response = await axios.get(apiUrl);
      const productData = await response.data.data;
      return productData;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error.message);
    }
  });

  return await Promise.all(promises);
}

app.get("/carts/:userId/wishlist", async (req, res) => {
  const { userId } = req.params;
  try {
    const { data } = await axios.get(
      `http://localhost:3003/carts/${userId}/wishlist`
    );
    if (data?.data?.length < 1)
      return res.status(400).json({
        status: "error",
        message: "No items in the Wishlist.",
        data: [],
      });
    const productsData = await getProductDetails(data.data);
    return res.status(200).json({
      status: "ok",
      message: "Data found.",
      data: productsData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

setupLogging(app);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(PORT, () => {
  console.log(`Api Gateway listening at PORT ${PORT}`);
});
