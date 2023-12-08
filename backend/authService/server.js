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
app.use("/auth", require("./routes/auth.route"));

//apis required for auth service
// 1. User Registration API
// 2. User Login API
// 3. Token Validation API
// 4. Password Reset API
// 5. User Profile API
// 6. Logout API
// 7. Authorization Check API
// 8. Role Management API
// 9. Token Refresh API

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth Service running at port ${PORT}`);
});
