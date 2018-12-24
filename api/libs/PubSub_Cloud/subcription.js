import PubSub from '@google-cloud/pubsub';
import config from '../../config';
import {handlerMessager} from './handlerMessage';

const pubsub = new PubSub({
  projectId:config.projectId
});

module.exports = {
  getlistSubscriptions : () =>{
    pubsub
      .getSubscriptions()
      .then(results => {
        const subscriptions = results[0];

        console.log('Subscriptions:');
        subscriptions.forEach(subscription => console.log(subscription.name));
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },
  listTopicSubscriptions: (topicName) => {
    pubsub
      .topic(topicName)
      .getSubscriptions()
      .then(results => {
        const subscriptions = results[0];

        console.log(`Subscriptions for ${topicName}:`);
        subscriptions.forEach(subscription => console.log(subscription.name));
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },
  createSubscription: (topicName, subscriptionName)=>{
    pubsub
      .topic(topicName)
      .createSubscription(subscriptionName)
      .then(results => {
        const subscription = results[0];
        console.log(`Subscription ${subscriptionName} created.`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },
  deleteSubscription: (subscriptionName) =>{
    pubsub
      .subscription(subscriptionName)
      .delete()
      .then(() => {
        console.log(`Subscription ${subscriptionName} deleted.`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },
  listenForMessages: (subscriptionName, timeout)=>{
    let subscription = pubsub.subscription(subscriptionName);
    console.log('Listening..... '+ subscriptionName);
    // Create an event handler to handle messages
    let messageCount = 0;
    let messageHandler = async message => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      await handlerMessager(message.data);
      messageCount += 1;

      // "Ack" (acknowledge receipt of) the message
      message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on(`message`, messageHandler);

    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);
  }
};