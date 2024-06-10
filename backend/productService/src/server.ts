import dotenv from "dotenv";
dotenv.config();
import { connect } from "./config/db";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productsRoute from "./routes/products.route.js";
import { initializeChannel, getChannel } from './channelModule';


const StartServer = async (): Promise<void> => {
    await initializeChannel();

    const app = express();
    //Body Parser configuration
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        limit: "50mb",
        parameterLimit: 100000,
        extended: true,
    }));

    app.use(cors());

    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     req.channel = getChannel();
    //     next();
    // })

    app.use('/products', productsRoute);
    const PORT = 3002;
    app.listen(PORT, () => {
        connect()
        console.log(`Product Service running at port ${PORT}`);
    });
}

StartServer();








