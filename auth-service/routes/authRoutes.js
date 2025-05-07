const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

// ✅ Nouvelle route pour récupérer les infos utilisateur via le token
router.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
