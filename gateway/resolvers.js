const authService = require('./services/authService');
const orderService = require('./services/orderService');

module.exports = {
  Query: {
    getUser: (_, { token }) => authService.verifyToken(token),
    getOrders: (_, { token }) => orderService.getOrders(token),
  },
  Mutation: {
    login: (_, { email, password }) => authService.login(email, password),
    createOrder: (_, { token, items, totalAmount }) =>
      orderService.createOrder(token, items, totalAmount),
  },
};
