const express = require('express');

const {
  recommend,
} = require('../controllers/recommendationController');

const router = express.Router();

const {recommendationLimiter,} = require('../middlewares/rateLimiter');

router.post(
  '/',
  recommendationLimiter,
  recommend
);

module.exports = router;