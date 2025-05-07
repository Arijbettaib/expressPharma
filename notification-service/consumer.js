const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['kafka:9092'] // nom du service Docker Kafka
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order_notifications', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log(`📬 Notification reçue :`, JSON.parse(value));
    }
  });
};

module.exports = { runConsumer };
