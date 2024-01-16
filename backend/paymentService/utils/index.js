const amqplib = require("amqplib");
const {MESSAGE_BROKER_URL, EXCHANGE_NAME, QUEUE_NAME, PAYMENT_BINDING_KEY} = require("../config/index")
/* ---------------------------- message broker ---------------------- */

// create a channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

//publish messages
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    console.log("message sent")
  } catch (error) {
    throw error;
  }
};

// subscribe messages
module.exports.SubscribeMessage = async (channel, service) => {
  const appQueue = await channel.assertQueue(QUEUE_NAME);

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, PAYMENT_BINDING_KEY);

  channel.consume(appQueue.queue, (data) => {
    //console.log("received data");
    // console.log(data.content.toString());
    channel.ack(data);
    service(data.content.toString());
  });
};
