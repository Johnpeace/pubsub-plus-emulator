# Pubsub Plus Emulator
[![Build Status](https://travis-ci.com/Johnpeace/pubsub-plus-emulator.svg?branch=master)](https://travis-ci.com/Johnpeace/pubsub-plus-emulator)
[![Coverage Status](https://coveralls.io/repos/github/Johnpeace/pubsub-plus-emulator/badge.svg?branch=master)](https://coveralls.io/github/Johnpeace/pubsub-plus-emulator?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d672c56aade869544ff/maintainability)](https://codeclimate.com/github/Johnpeace/pubsub-plus-emulator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6d672c56aade869544ff/test_coverage)](https://codeclimate.com/github/Johnpeace/pubsub-plus-emulator/test_coverage)

This is a wrapper for google cloud pub/sub and local testing emulator

## Install

### npm
```sh
$ npm install pubsub-plus-emulator
```

## Using Google Cloud Pubsub locally with Google Cloud Emulator
```sh 
$ docker run -it -p 8085:8085 knarz/pubsub-emulator
```

## Using Pubsub on staging with google cloud emulator
* Put the google cloud pubsub service account json file into the root directory of the project
* rename the service account json file to `staging-service-account.json`


## Using Pubsub on staging with google cloud emulator
* Put the google cloud pubsub service account json file into the root directory of the project
* rename the service account json file to `production-service-account.json`


## Usage

The library is imported in either of the following ways:

```js
import PubSub from 'pubsub-plus-emulator';
```

## To publish a message
```
import PubSub from "pubsub-plus-emulator";

process.env.NODE_ENV = "development";

export const publisher = async (payload) => {
  const pubsubClient = new PubSub();
  await pubsubClient.publish("topicName", payload);
};

publisher(payload)

const payload = {
  firstName: "Ropo",
  lastName: "Olatujoye",
  twitter: "@iamfiropo",
};
```

## To subscribe to an event
```
import PubSub from 'pubsub-plus-emulator';

const pubsubClient = new PubSub();

pubsubClient.subscribe('topicName', 'subscriptionName', subscriberFunc);

Note: It's important this is an arrow function

const subscriberFunc = (data) => {
    console.log(data);
    // do anything with the received event
}
```