import * as amqplib from "amqplib/callback_api";
import config from "../config/index";


// Create a channel with type safety
export const CreateChannel = async (): Promise<amqplib.ConfirmChannel> => {
    try {
        const connection = amqplib.connect(config?.MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(config.EXCHANGE_NAME, "direct", false);
        return channel as amqplib.ConfirmChannel; // Cast with caution if unsure about actual channel type
    } catch (error) {
        throw error;
    }
};

// Publish messages with type safety
export const PublishMessage = async (channel: amqplib.ConfirmChannel, bindingKey: string, message: Message): Promise<void> => {
    try {
        channel.publish(config.EXCHANGE_NAME, bindingKey, Buffer.from(message.content));
    } catch (error) {
        throw error;
    }
};

// Subscribe to messages with type safety
export const SubscribeMessage = async (channel: amqplib.ConfirmChannel, service: (message: string) => void): Promise<void> => {
    const appQueue = channel.assertQueue(config.CART_QUEUE);

    channel.bindQueue(appQueue.queue, config.EXCHANGE_NAME, config.PRODUCT_BINDING_KEY);

    channel.consume(
        appQueue.queue,
        (data: amqplib.ConsumeMessage) => {
            service(data.content.toString());
            channel.ack(data);
        }
    );
};