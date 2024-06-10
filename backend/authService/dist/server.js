import dotenv from "dotenv";
dotenv.config();
import { connect } from "./config/db.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route.js";
const app = express();
//Body Parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
}));
app.use(cors());
//Custom routes
app.use('/auth', authRoute);
const PORT = 3001;
app.listen(PORT, () => {
    connect();
    console.log(`Auth Service running at port ${PORT}`);
});
