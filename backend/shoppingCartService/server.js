require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

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
)

app.use(cors());

//-----Custom Routes ------ 
app.use("/carts", require("./routes/cart.route"));

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Shopping Cart Service running at port ${PORT}`);
});
