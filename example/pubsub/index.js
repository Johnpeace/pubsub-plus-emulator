import PubSub from 'pubsub-plus-emulator';

const pubsubClient = new PubSub();

pubsubClient.subscribe('topicName', 'subscriptionName', subscriberFunc);

const subscriberFunc = (data) => {
  console.log(data);
  // do anything with the received event
};
