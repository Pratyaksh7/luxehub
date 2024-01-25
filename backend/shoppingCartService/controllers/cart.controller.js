const { default: axios } = require("axios");
const { getPriceForProduct, applyDiscountCode } = require("../helper");
const ShoopingCart = require("../models/ShoppingCart.model");
const WishList = require("../models/Wishlist.model");
const {
  SubscribeMessage,
  PublishMessage,
  SubscribeMessageFromProduct,
} = require("../utils/index");
const { getChannel } = require("../channelModule");
const { PRODUCT_BINDING_KEY } = require("../config");

const channel = getChannel();
SubscribeMessage(channel, messageHandler);

async function messageHandler(data) {
  const parsedData = JSON.parse(data);

  switch (parsedData?.event) {
    case "CLEAR_THE_CART":
      clearCart(parsedData?.userId);
      break;

    default:
      return null;
  }
}

// Clear the cart Items
async function clearCart(userId) {
  try {
    const existingCart = await ShoopingCart.findOne({ userId: userId?._id });
    existingCart.items = [];
    await existingCart.save();
  } catch (error) {
    console.log(error);
  }
}

exports.Ping = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ status: "ok", message: "Shopping Cart Service is healthy." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

async function getProductDetails(cartItems) {
  const apiBaseURL = "http://localhost:3002/products";

  const promises = cartItems?.map(async (cartItem) => {
    const { productId, quantity } = cartItem;
    const apiUrl = `${apiBaseURL}/${productId}`;

    try {
      const response = await axios.get(apiUrl);

      const productData = response.data.data;
      productData.quantity = quantity;
      return productData;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error.message);
    }
  });
  return await Promise.all(promises);
}

exports.getCartItems = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const existingCart = await ShoopingCart.findOne({ userId });
    if (!existingCart)
      return res.status(200).json({
        status: "ok",
        message: "Shopping Cart is empty",
        data: { items: [] },
      });

    return res.status(200).json({
      status: "ok",
      message: "Shopping cart retrieved successfully",
      data: existingCart.items,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  const { userId } = req.params;
  const {
    id,
    name,
    description,
    categories,
    price,
    currencies,
    stock_qty,
    manufacturer,
    images,
    attributes,
    tags,
    rating,
    reviews,
    quantity,
  } = req.body;
  try {
    if (!id || !quantity || quantity <= 0)
      return res
        .status(400)
        .json({ status: "error", message: "Invalid input" });
    let existingCart = await ShoopingCart.findOne({ userId });
    if (!existingCart) {
      existingCart = new ShoopingCart({
        userId,
        items: [],
      });
    }

    const existingItemIndex = existingCart.items.findIndex(
      (item) => item.id === id
    );

    if (existingItemIndex !== -1) {
      existingCart.items[existingItemIndex].quantity += quantity;
    } else {
      existingCart.items.push({
        id,
        name,
        description,
        categories,
        price,
        currencies,
        stock_qty,
        manufacturer,
        images,
        attributes,
        tags,
        rating,
        reviews,
        quantity,
      });
    }

    await existingCart.save();
    return res.status(201).json({
      status: "ok",
      message: "Item added to cart successfully.",
      data: existingCart,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const existingCart = await ShoopingCart.findOne({ userId });
    if (!existingCart)
      return res
        .status(400)
        .json({ status: "error", message: "Shopping Cart Not found" });
    const itemIndex = existingCart.items.findIndex(
      (item) => item._id.toString() === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({
        status: "error",
        message: "Item not found in the shopping cart.",
      });
    existingCart.items.splice(itemIndex, 1);

    await existingCart.save();
    return res.status(200).json({
      status: "ok",
      message: "Item removed from the shopping cart.",
      data: existingCart,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateItemQtyInCart = async (req, res, next) => {
  const { userId } = req.params;
  const productsData = req.body;

  try {
    if (!Array.isArray(productsData) || productsData.length === 0) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    const existingCart = await ShoopingCart.findOne({ userId });

    if (!existingCart) {
      return res.status(400).json({
        status: "error",
        message: "Shopping Cart Not found",
      });
    }

    for (const { productId, quantity } of productsData) {
      if (!quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid quantity" });
      }

      const itemIndex = existingCart.items.findIndex(
        (item) => item._id.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: `Item with productId ${productId} not found in the shopping cart.`,
        });
      }

      existingCart.items[itemIndex].quantity = quantity;
    }

    await existingCart.save();

    return res.status(200).json({
      status: "ok",
      message: "Item quantities updated in the cart successfully",
      existingCart,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.clearCart = async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const existingCart = await ShoopingCart.findOne({ userId });
//     if (!existingCart)
//       return res
//         .status(400)
//         .json({ status: "error", message: "Shopping Cart Not found" });

//     existingCart.items = [];
//     await existingCart.save();

//     return res.status(200).json({
//       status: "ok",
//       message: "Shopping cart cleared successfully",
//       data: existingCart,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

/* Wishlist apis */
exports.addToWishList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const {
      id,
      name,
      description,
      categories,
      price,
      currencies,
      stock_qty,
      manufacturer,
      images,
      attributes,
      tags,
      rating,
      reviews,
      quantity,
    } = req.body;
    let wishlist = await WishList.findOne({ userId });

    if (!wishlist) {
      wishlist = new WishList({
        userId,
        items: [],
      });
    }

    const existingItem = wishlist.items.find((item) => item.id === id);
    if (!existingItem) {
      wishlist.items.push({
        id,
        name,
        description,
        categories,
        price,
        currencies,
        stock_qty,
        manufacturer,
        images,
        attributes,
        tags,
        rating,
        reviews,
        quantity: quantity || 1,
      });
    }

    await wishlist.save();

    return res.status(201).json({
      status: "ok",
      message: "Product added to wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getWishList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const wishlist = await WishList.find({ userId });
    if (wishlist.length < 1) {
      return res
        .status(404)
        .json({ status: "error", message: "Wishlist not found" });
    } else {
      return res.status(200).json({
        status: "ok",
        message: "Data found.",
        data: wishlist[0].items,
      });
      // const requestBody = {
      //   event: "GET_PRODUCT_DETAILS",
      //   productDetails: wishlist[0]?.items?.map((product) => {
      //     return { productId: product?.productId };
      //   }),
      // };
      // PublishMessage(channel, PRODUCT_BINDING_KEY, JSON.stringify(requestBody));
      /* 
      ---------------------TASK-----------------------
       need to handle the subscribe inside here 
       getting error 
      
      */
      // SubscribeMessageFromProduct(channel, async (data) => {
      //   const parsedData = JSON.parse(data);
      //   if (
      //     parsedData?.event == "PRODUCTS_FOUND" &&
      //     parsedData?.status == "ok"
      //   ) {
      //     return res.status(200).json({
      //       status: "ok",
      //       message: "Data found.",
      //       data: parsedData?.data,
      //     });
      //   }
      // });

      /* ---------------------------------------
      TASK : to check the GET WISHLIST Items api in frontend 
      --------------------------------------------------*/
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.removeFromWishList = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const wishlist = await WishList.findOne({ userId });

    if (!wishlist) {
      return res
        .status(404)
        .json({ status: "error", message: "Wishlist not found" });
    }

    const itemIndex = wishlist.items.findIndex((item) => item._id == productId);
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Item not found in wishlist" });
    }

    wishlist.items.splice(itemIndex, 1);

    await wishlist.save();

    res.status(200).json({
      status: "ok",
      message: "Product removed from wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCartTotal = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const existingCart = await ShoopingCart.findOne({ userId });
    if (!existingCart)
      return res
        .status(400)
        .json({ status: "error", message: "Shopping Cart Not found" });
    const total = existingCart.items.reduce((acc, item) => {
      return acc + (item?.price * item?.quantity);
    }, 0);
    /**
          ---------------------------------------------------------
          Task: Done - 1. Convert Add to Cart Api to store the product info in shopping cart model
                Done - 2. Change Its get Api
                3. This is getTotal Cart Api
                4. Make sure to not use Publish and Subscribe for this
                5. Integrate these apis in the frontend as well
          ---------------------------------------------------------

         */
    // const total = existingCart.items.reduce((acc, item) => {
    //   const productPrice = getPriceForProduct(item.productId);
    //   return acc + productPrice * item.quantity;
    // }, 0);
    return res.status(200).json({
      status: "ok",
      message: "Total cost retrieved successfully",
      data: total,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.applyDiscountCode = async (req, res, next) => {
  const { userId } = req.params;
  const { discountCode } = req.body;
  try {
    if (!discountCode || typeof discountCode !== "string")
      return res.status(400).json({ error: "Invalid discount code" });

    const existingCart = await ShoopingCart.findOne({ userId });
    if (!existingCart)
      return res
        .status(400)
        .json({ status: "error", message: "Shopping Cart Not found" });

    const discountedCart = await applyDiscountCode(existingCart, discountCode);

    await discountedCart.save();
    return res.status(200).json({
      message: "Discount code applied successfully",
      data: discountedCart,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
