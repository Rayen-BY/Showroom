const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const {
  addFavori,
  getFavoris,
  deleteFavori,
} = require('../controllers/favoriController');

const router = express.Router();

router.post('/:vehiculeId', authMiddleware, addFavori);

router.get('/', authMiddleware, getFavoris);

router.delete('/:vehiculeId', authMiddleware, deleteFavori);

module.exports = router;