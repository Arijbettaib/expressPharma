const axios = require('axios');

exports.getOrders = async (token) => {
  const response = await axios.get('http://order-service:3002/api/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

exports.createOrder = async (token, items, totalAmount) => {
  const response = await axios.post(
    'http://order-service:3002/api/orders',
    { items, totalAmount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.order;
};