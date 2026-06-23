const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, logout } = require('../controllers/authController');

const router = express.Router();

const {loginLimiter,} = require('../middlewares/rateLimiter');

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.post('/logout', authMiddleware, logout);

module.exports = router;