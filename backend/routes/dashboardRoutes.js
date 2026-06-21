const express = require('express');

const {
  getDashboard,
} = require('../controllers/dashboardController');

const authMiddleware = require(
  '../middlewares/authMiddleware'
);

const adminMiddleware = require(
  '../middlewares/adminMiddleware'
);

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  adminMiddleware,
  getDashboard
);

module.exports = router;