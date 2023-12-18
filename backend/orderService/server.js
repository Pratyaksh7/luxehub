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
app.use("/orders", require("./routes/order.route"));

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Order Service running at port ${PORT}`);
});
