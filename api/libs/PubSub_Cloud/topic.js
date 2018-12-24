import PubSub from '@google-cloud/pubsub';
import config from '../../config';

const pubsubClient = new PubSub({
  projectId: config.projectId
});

module.exports = {
  createTopic : (topicName)=>{
    console.log('Creating Topic..');
    pubsubClient
      .createTopic(topicName)
      .then(results => {
        const topic = results[0];
        console.log(`Topic ${topicName} created.`);
      })
      .catch(err => {
        console.error('Create topic error :', err);
      });
  },
  deleteTopic : (topicName)=>{
    console.log('Deleting Topic..');
    pubsubClient
      .topic(topicName)
      .delete()
      .then(() => {
        console.log(`Topic ${topicName} deleted.`);
      })
      .catch(err => {
        console.error('Delete topic error:', err);
      });
  },
  publishMessage: (topicName, data) =>{
    let dataBuffer = Buffer.from(JSON.stringify(data));
    pubsubClient
      .topic(topicName)
      .publisher()
      .publish(dataBuffer)
      .then(messageId => {
        console.log(`Message ${messageId} published.`);
      })
      .catch(err => {
        console.error('Pulish message error :', err);
      });
  },
  publishBatchedMessages: (topicName, data, maxMessages, maxWaitTime) => {
    let dataBuffer = Buffer.from(data);
    pubsubClient
      .topic(topicName)
      .publisher({
        batching: {
          maxMessages: maxMessages,
          maxMilliseconds: maxWaitTime,
        },
      })
      .publish(dataBuffer)
      .then(results => {
        const messageId = results[0];
        console.log(`Message ${messageId} published.`);
      })
      .catch(err => {
        console.error('Pulish Batching Messagge Error:', err);
      });
  },
  getTopicPolicy: (topicName) => {
    pubsubClient
      .topic(topicName)
      .iam.getPolicy()
      .then(results => {
        const policy = results[0];
        console.log(`Policy for topic: %j.`, policy.bindings);
      })
      .catch(err => {
        console.error('Get topic error :', err);
      });
  },
  setTopicPolicy: (topicName, newPolicy)=>{
    pubsubClient
      .topic(topicName)
      .iam.setPolicy(newPolicy)
      .then(results => {
        const updatedPolicy = results[0];
        console.log(`Updated policy for topic: %j`, updatedPolicy.bindings);
      })
      .catch(err => {
        console.error('Set topic policy :', err);
      });
  }
};
