const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createOrder, getUserOrders, validateOrder } = require('../controllers/orderController');

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);
router.post('/:id/validate', auth, validateOrder); // ✅ Doit être ici avant l’export

module.exports = router;
