const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.Ping = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ status: "ok", message: "Auth Service is healthy." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.Signup = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;
  try {
    var existingUser;
    var isEmail;
    if (email) {
      existingUser = await User.find({ email });
      isEmail = true;
    } else if (mobile) {
      existingUser = await User.find({ mobile });
      isEmail = false;
    }

    if (existingUser.length > 0)
      return res
        .status(400)
        .json({ status: "error", message: "User already registered." });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
      mobile,
      status: true,
    });
    return res
      .status(201)
      .json({ status: "ok", message: "User created successfully." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.Signin = async (req, res, next) => {
  const { email, mobile, password } = req.body;
  try {
    var existingUser;
    var isEmail;
    if (email) {
      existingUser = await User.find({ email });
      isEmail = true;
    } else if (mobile) {
      existingUser = await User.find({ mobile });
      isEmail = false;
    }

    if (existingUser.length < 1) return res.status(200).json({ status: "error", message: "User not found" })
    if (await bcrypt.compare(password, existingUser[0].password)) {
      // generate JWT Token
      const token = jwt.sign(
        {
          _id: existingUser[0]._id,
          user: isEmail ? existingUser[0].email: existingUser[0].mobile,
        },
        process.env.USER_JWT_SECRET
      );
      const data = {
        _id: existingUser[0]?._id,
        name: existingUser[0]?.name,
        user: isEmail ? existingUser[0].email: existingUser[0].mobile,
        token,
      };
      return res
        .status(200)
        .json({ status: "ok", message: "Login successful", data });
    } else {
      return res
        .status(200)
        .json({
          status: "error",
          message: "You have entered a wrong password, Please try again.",
        });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
