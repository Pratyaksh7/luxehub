require("dotenv").config();


module.exports = {
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: 'LUXEHUB',
    ORDER_BINDING_KEY: 'ORDER_SERVICE',
    CART_BINDING_KEY: 'CART_SERVICE',
    PRODUCT_BINDING_KEY: 'PRODUCT_SERVICE',
    ORDER_QUEUE: 'ORDER_QUEUE',// FROM: which microservice
    PRODUCT_QUEUE: 'PRODUCT_QUEUE'
}