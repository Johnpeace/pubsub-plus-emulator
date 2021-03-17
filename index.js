/*
eslint class-methods-use-this: ["error", { "exceptMethods": ["listenForPushMessages"] }]
*/

import { join } from 'path';
import pkg from '@google-cloud/pubsub';

const { PubSub } = pkg;

export default class Pubsub {
  constructor() {
    switch (process.env.NODE_ENV) {
      case 'development':
        this.projectId = 'test-project';
        this.pubSubClient = new PubSub({ projectId: this.projectId });
        process.env.PUBSUB_EMULATOR_HOST = '127.0.0.1:8085';
        break;

      case 'staging':
        this.pubSubClient = new PubSub();
        process.env.GOOGLE_APPLICATION_CREDENTIALS = join(
          __dirname,
          './staging-service-account.json'
        );
        break;

      case 'production':
        this.pubSubClient = new PubSub();
        process.env.GOOGLE_APPLICATION_CREDENTIALS = join(
          __dirname,
          './production-service-account.json'
        );
        break;

      default:
        throw new Error(
          'NODE_ENV value can only be development, staging or production'
        );
    }
  }

  async publish(topicName, payload) {
    try {
      const topic = await this.getTopic(topicName);
      const dataBuffer = Buffer.from(JSON.stringify(payload));

      const messageId = await this.pubSubClient
        .topic(topic)
        .publish(dataBuffer);
      console.log(`Message ${messageId} published.`);
      return messageId;
    } catch (error) {
      return error.message;
    }
  }

  async subscribe(topicName, subscriptionName, func) {
    const subscription = await this.getSubscription(
      topicName,
      subscriptionName
    );

    let messageCount = 0;
    const messageHandler = (message) => {
      try {
        console.log(`Received message ${message.id}:`);
        func(message.data.toString());
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;

        message.ack();
      } catch (error) {
        return error.message;
      }
    };

    subscription.on('message', messageHandler);

    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, 60 * 1000);
  }

  listenForPushMessages(payload) {
    try {
      const message = Buffer.from(payload, 'base64').toString('utf-8');
      const parsedMessage = JSON.parse(message);
      console.log(parsedMessage);
      return parsedMessage;
    } catch (error) {
      return error.message;
    }
  }

  async createPushSubscription(pushEndpoint, topicName, subscriptionName) {
    const options = {
      pushConfig: { pushEndpoint: `${pushEndpoint}/subscribe/push` },
    };

    try {
      await this.pubSubClient
        .topic(topicName)
        .createSubscription(subscriptionName, options);
    } catch (error) {
      return error.message;
    }
  }

  async createTopic(topicName) {
    try {
      const [topic] = await this.pubSubClient.createTopic(topicName);
      return topic.name;
    } catch (error) {
      return error.message;
    }
  }

  async createSubscription(topicName, subscriptionName) {
    try {
      const [subscription] = await this.pubSubClient
        .topic(topicName)
        .createSubscription(subscriptionName);

      return subscription.name;
    } catch (error) {
      return error.message;
    }
  }

  async listAllTopics() {
    try {
      const [topics] = await this.pubSubClient.getTopics();
      return topics;
    } catch (error) {
      return error.message;
    }
  }

  async getTopic(topicName) {
    try {
      const [topics] = await this.pubSubClient.getTopics();
      const existingTopic = topics.some((topic) => topic.name === topicName);

      if (!existingTopic) {
        const topic = await this.createTopic(topicName);
        return topic;
      }

      return existingTopic;
    } catch (error) {
      return error.message;
    }
  }

  async getSubscription(topicName, subscriptionName) {
    try {
      const [subscriptions] = await this.pubSubClient.getSubscriptions();

      const existingSubscription = subscriptions.some(
        (subscription) => subscription.name === subscriptionName
      );

      if (!existingSubscription) {
        const subscription = await this.createSubscription(
          topicName,
          subscriptionName
        );

        return subscription;
      }

      return existingSubscription;
    } catch (error) {
      return error.message;
    }
  }

  async listSubscriptions() {
    try {
      const [subscriptions] = await this.pubSubClient.getSubscriptions();
      return subscriptions;
    } catch (error) {
      return error.message;
    }
  }
}
