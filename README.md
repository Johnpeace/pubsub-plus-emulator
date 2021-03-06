# Pubsub Plus Emulator
[![Build Status](https://travis-ci.com/Johnpeace/pubsub-plus-emulator.svg?branch=master)](https://travis-ci.com/Johnpeace/pubsub-plus-emulator)
[![Coverage Status](https://coveralls.io/repos/github/Johnpeace/pubsub-plus-emulator/badge.svg?branch=master)](https://coveralls.io/github/Johnpeace/pubsub-plus-emulator?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d672c56aade869544ff/maintainability)](https://codeclimate.com/github/Johnpeace/pubsub-plus-emulator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6d672c56aade869544ff/test_coverage)](https://codeclimate.com/github/Johnpeace/pubsub-plus-emulator/test_coverage)

This is a wrapper for google cloud pub/sub and local testing emulator
## how to use
to publish a message
```
import { publish } from 'pubsub-plus-emulator';

await publish('topicName', payload);
```

to publish json data

```
await publish('topic1', payload);
```

to subscribe a service to listen to events
```
import { subscribe } from 'pubsub-plus-emulator';

subscribe('topicName', 'subscriptionName', eventHandler);

function eventHandler(data) {
    console.log(data);
    // message
}
```