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

const PubSub = require('pubsub-plus-emulator');

const PubSub = require('pubsub-plus-emulator').default; 
```

## To publish a message
```
import PubSub from 'pubsub-plus-emulator';

const pubsubClient = new PubSub();

await pubsubClient.publish('topicName', {
  firstName: 'Ropo',
  lastName: 'Olatujoye',
  phone: 89098798778
});
```

## To subscribe to an event
```
import PubSub from 'pubsub-plus-emulator';

const pubsubClient = new PubSub();

await pubsubClient.subscribe('topicName', 'subscriptionName', eventHandler);

function eventHandler(data) {
    console.log(data);
    // message
}
```