const Product = require("../models/Product.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

exports.Ping = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ status: "ok", message: "Products Service is healthy." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res
      .status(201)
      .json({ status: "ok", message: "Product created.", data: savedProduct });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.listProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter = { categories: category };
    }

    const products = await Product.find(filter);
    if (products.length < 1)
      return res
        .status(404)
        .json({ status: "error", message: "Not found.", data: [] });
    return res
      .status(200)
      .json({ status: "ok", message: "Data found.", data: products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const validObjectId = mongoose.Types.ObjectId.isValid(productId);
    if (!validObjectId) {
      return res.status(400).json({
        status: "error",
        message: "Invalid productId format.",
        data: {},
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found.",
        data: {},
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const validObjectId = mongoose.Types.ObjectId.isValid(productId);
    if (!validObjectId) {
      return res.status(400).json({
        status: "error",
        message: "Invalid productId format.",
        data: {},
      });
    }

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Not found.", data: {} });
    return res
      .status(200)
      .json({ status: "ok", message: "Data found.", data: product });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteAProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const validObjectId = mongoose.Types.ObjectId.isValid(productId);
    if (!validObjectId) {
      return res.status(400).json({
        status: "error",
        message: "Invalid productId format.",
        data: {},
      });
    }

    const product = await Product.findOneAndDelete({ _id: productId });
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found.", data: {} });
    return res
      .status(200)
      .json({ status: "ok", message: "Product deleted", data: product });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.categoriesList = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length < 1)
      return (
        res.status(404), json({ status: "error", message: "Data not found." })
      );
    const all_categories = products.reduce((categories, product) => {
      return categories.concat(product.categories);
    }, []);
    const uniqueCategories = Array.from(new Set(all_categories));
    return res
      .status(200)
      .json({ status: "ok", message: "Data found.", data: uniqueCategories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const { keywords, category } = req.body;
    const query = {};
    if (keywords) {
      query.$or = [
        { name: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
        { tags: { $regex: keywords, $options: 'i' } }
    ];
    }
    if (category) {
      query.categories = category;
    }

    const products = await Product.find(query);
    if (products.length < 1)
      return res
        .status(404)
        .json({ status: "error", message: "No products found.", data: [] });
    return res
      .status(200)
      .json({ status: "ok", message: "Products found.", data: products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
