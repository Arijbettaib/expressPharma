const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const sendNotification = async (message) => {
  await producer.send({
    topic: 'order_notifications',
    messages: [{ value: JSON.stringify(message) }]
  });
};

module.exports = { connectProducer, sendNotification };
