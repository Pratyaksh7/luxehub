"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: 'LUXEHUB',
    ORDER_BINDING_KEY: 'ORDER_SERVICE',
    CART_BINDING_KEY: 'CART_SERVICE',
    PRODUCT_BINDING_KEY: 'PRODUCT_SERVICE',
    CART_QUEUE: 'CART_QUEUE', // FROM: which microservice
};
exports.default = config;
