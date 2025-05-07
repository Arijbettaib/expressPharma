const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const { connectProducer } = require('./kafka/producer'); // ✅ Connexion Kafka

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

// MongoDB + Kafka
mongoose.connect(process.env.MONGO_URI, {
  // ⚠️ Ces options ne sont plus nécessaires mais ne bloquent pas
}).then(async () => {
  console.log("✅ Connected to MongoDB - order-service");

  // ✅ Connexion au producteur Kafka
  await connectProducer();

  app.listen(PORT, () =>
    console.log(`🚀 Order-Service running on port ${PORT}`)
  );
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
