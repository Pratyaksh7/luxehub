import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    MESSAGE_BROKER_URL: string;
    EXCHANGE_NAME: string;
    ORDER_BINDING_KEY: string;
    CART_BINDING_KEY: string;
    PRODUCT_BINDING_KEY: string;
    CART_QUEUE: string;
}

const config: Config = {
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL as string,
    EXCHANGE_NAME: 'LUXEHUB',
    ORDER_BINDING_KEY: 'ORDER_SERVICE',
    CART_BINDING_KEY: 'CART_SERVICE',
    PRODUCT_BINDING_KEY: 'PRODUCT_SERVICE',
    CART_QUEUE: 'CART_QUEUE',// FROM: which microservice
}

export default config;