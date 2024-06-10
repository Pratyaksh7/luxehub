"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeMessage = exports.PublishMessage = exports.CreateChannel = void 0;
const amqplib = __importStar(require("amqplib/callback_api"));
const index_1 = __importDefault(require("../config/index"));
// Create a channel with type safety
const CreateChannel = async () => {
    try {
        const connection = amqplib.connect(index_1.default?.MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(index_1.default.EXCHANGE_NAME, "direct", false);
        return channel; // Cast with caution if unsure about actual channel type
    }
    catch (error) {
        throw error;
    }
};
exports.CreateChannel = CreateChannel;
// Publish messages with type safety
const PublishMessage = async (channel, bindingKey, message) => {
    try {
        channel.publish(index_1.default.EXCHANGE_NAME, bindingKey, Buffer.from(message.content));
    }
    catch (error) {
        throw error;
    }
};
exports.PublishMessage = PublishMessage;
// Subscribe to messages with type safety
const SubscribeMessage = async (channel, service) => {
    const appQueue = channel.assertQueue(index_1.default.CART_QUEUE);
    channel.bindQueue(appQueue.queue, index_1.default.EXCHANGE_NAME, index_1.default.PRODUCT_BINDING_KEY);
    channel.consume(appQueue.queue, (data) => {
        service(data.content.toString());
        channel.ack(data);
    });
};
exports.SubscribeMessage = SubscribeMessage;
