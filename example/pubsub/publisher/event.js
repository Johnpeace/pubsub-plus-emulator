import PubSub from 'pubsub-plus-emulator';

export const publisher = async (payload) => {
  const pubsubClient = new PubSub();
  await pubsubClient.publish('topicName', payload);
};
