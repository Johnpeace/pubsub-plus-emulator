# Autochek Pubsub
this library wraps around google pubsub

## how to use
to publish a message
```
import { publish } from 'pubsub-plus-emulator';

await publish('topic1', 'message');
```

to publish json data

```
await publish('topic1', JSON.stringify({ a: 'b' }));
```

to subscribe a service to listen to events
```
import { subscribe } from '@autochek-africa/pubsub';

subscribe('topic1', 'subscription', myEventHandler);

function myEventHandler(data) {
    console.log(data);
    // message
}
```