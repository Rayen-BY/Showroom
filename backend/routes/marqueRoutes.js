const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { addMarque } = require('../controllers/marqueController');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, addMarque);

module.exports = router;