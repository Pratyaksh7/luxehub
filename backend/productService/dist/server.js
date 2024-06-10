"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./config/db");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_route_js_1 = __importDefault(require("./routes/products.route.js"));
const channelModule_1 = require("./channelModule");
const StartServer = async () => {
    await (0, channelModule_1.initializeChannel)();
    const app = (0, express_1.default)();
    //Body Parser configuration
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({
        limit: "50mb",
        parameterLimit: 100000,
        extended: true,
    }));
    app.use((0, cors_1.default)());
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     req.channel = getChannel();
    //     next();
    // })
    app.use('/products', products_route_js_1.default);
    const PORT = 3002;
    app.listen(PORT, () => {
        (0, db_1.connect)();
        console.log(`Product Service running at port ${PORT}`);
    });
};
StartServer();
