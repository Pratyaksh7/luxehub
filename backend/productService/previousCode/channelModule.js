const { CreateChannel } = require("./utils");

let channelInstance;

const initializeChannel = async () => {
  if (!channelInstance) {
    channelInstance = await CreateChannel();
  }
};

const getChannel = () => {
  if (!channelInstance) {
    throw new Error("Channel not initialized. Call initializeChannel first.");
  }
  return channelInstance;
};

module.exports = {
  initializeChannel,
  getChannel,
};
