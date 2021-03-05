import { PubSub, Topic, Subscription } from "@google-cloud/pubsub";
import { join } from "path";
import * as retry from "async-retry";

export default class Pubsub {
  constructor(projectId, pubSubClient) {
    this.projectId = projectId;
    this.pubSubClient = pubSubClient;

    switch (process.env.NODE_ENV) {
      case "development":
        process.env.PUBSUB_PROJECT_ID = "test-project";
        process.env.PUBSUB_EMULATOR_HOST = "localhost:8085";
        break;

      case "staging":
        process.env.PUBSUB_PROJECT_ID = "";
        process.env.GOOGLE_APPLICATION_CREDENTIALS = join(
          __dirname,
          "./staging-account-key.json"
        );
        break;

      case "production":
        process.env.PUBSUB_PROJECT_ID = ";
        process.env.GOOGLE_APPLICATION_CREDENTIALS = join(
          __dirname,
          "./production-account-key.json"
        );
        break;

      default:
        throw new Error(
          "NODE_ENV value can only be development, staging or production"
        );
    }

    this.pubSubClient = new PubSub({ projectId: this.projectId });
  }
  static async publishMessage(pubSubClient, topic, payload) {
    const dataBuffer = Buffer.from(JSON.stringify(payload));

    try {
      const messageId = await pubSubClient.topic(topic).publish(dataBuffer);
      console.log(`Message ${messageId} published.`);
      return messageId;
    } catch (error) {
      return error.message;
    }
  }

  static listenForPullMessages(pubSubClient, subscriptionName, timeout) {
    const subscription = pubSubClient.subscription(subscriptionName);

    let messageCount = 0;
    const messageHandler = (message) => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;

      message.ack();
    };

    subscription.on("message", messageHandler);

    setTimeout(() => {
      subscription.removeListener("message", messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);
  }

  static listenForPushMessages(payload) {
    try {
      const message = Buffer.from(payload, "base64").toString("utf-8");
      let parsedMessage = JSON.parse(message);
      console.log(parsedMessage);
      return parsedMessage;
    } catch (error) {
      return error.message;
    }
  }

  static async createPushSubscription(
    pubSubClient,
    pushEndpoint,
    topicName,
    subscriptionName
  ) {
    const options = {
      pushConfig: { pushEndpoint: `${pushEndpoint}/subscribe/push` },
    };

    try {
      await pubSubClient
        .topic(topicName)
        .createSubscription(subscriptionName, options);
    } catch (error) {
      return error.message;
    }
  }

  static async createTopic(pubSubClient, topicName) {
    try {
      const [topic] = await pubSubClient.createTopic(topicName);
      return topic.name;
    } catch (error) {
      return error.message;
    }
  }

  static async listAllTopics(pubSubClient) {
    const [topics] = await pubSubClient.getTopics();
    return topics;
  }

  static async listSubscriptions(pubSubClient) {
    const [subscriptions] = await pubSubClient.getSubscriptions();
    return subscriptions;
  }
}
