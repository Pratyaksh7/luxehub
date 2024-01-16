require("dotenv").config();


module.exports = {
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: 'LUXEHUB',
    ORDER_BINDING_KEY: 'ORDER_SERVICE',
    CART_BINDING_KEY: 'CART_SERVICE',
    QUEUE_NAME: 'ORDER_QUEUE'// FROM: which microservice
}