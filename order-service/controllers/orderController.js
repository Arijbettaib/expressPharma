const Order = require('../models/Order');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { sendNotification } = require('../kafka/producer'); // ✅ ajout du producteur Kafka

// Charger le fichier .proto depuis le volume partagé
const PROTO_PATH = '/proto/commande.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const commandeProto = grpc.loadPackageDefinition(packageDefinition).commande;

// Initialiser le client gRPC vers pharma-service
const client = new commandeProto.CommandeService(
  'pharma-service:50051', // ✅ nom Docker
  grpc.credentials.createInsecure()
);

// 🛒 Créer une commande
exports.createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount
    });

    await order.save();
    res.status(201).json({ message: 'Commande créée', order });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Lister les commandes de l'utilisateur connecté
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Valider une commande via gRPC (pharma-service) et notifier via Kafka
exports.validateOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });

    client.ConfirmerCommande({ orderId }, async (err, response) => {
      if (err) {
        console.error('Erreur gRPC :', err);
        return res.status(500).json({ message: 'Erreur gRPC' });
      }

      order.status = response.status;
      await order.save();

      // ✅ Envoyer une notification Kafka
      await sendNotification({
        orderId: order._id.toString(),
        userId: order.userId.toString(),
        status: order.status,
        timestamp: new Date().toISOString()
      });

      res.json({
        message: response.message,
        order
      });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
