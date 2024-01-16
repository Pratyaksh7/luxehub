require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const { CreateChannel } = require("./utils");

const StartServer = async () => {
  const app = express();

  app.use(
    bodyParser.json({
      limit: "50mb",
    })
  );

  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      parameterLimit: 100000,
      extended: true,
    })
  );

  app.use(cors());

  const channel = await CreateChannel();
  // middleware to set this channel to req.channel
  const channelMiddleware = (req, res, next) => {
    req.channel = channel;
    next();
  };

  exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  app.get("/payments/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
  );
  //-----Custom Routes ------
  app.use("/payments",channelMiddleware, require("./routes/payment.route"));

  const PORT = 3005;
  app.listen(PORT, () => {
    console.log(`Payment Service running at port ${PORT}`);
  });
};

StartServer();
