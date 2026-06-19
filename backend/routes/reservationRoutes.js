const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const {
  createReservation,
  getReservations,
  acceptReservation,
  refuseReservation,
  cancelReservation,
  finishReservation,
} = require('../controllers/reservationController');

const router = express.Router();

router.post(
  '/:vehiculeId',
  authMiddleware,
  createReservation
);

router.get(
  '/',
  authMiddleware,
  adminMiddleware,
  getReservations
);

router.put(
  '/:id/accepter',
  authMiddleware,
  adminMiddleware,
  acceptReservation
);

router.put(
  '/:id/refuser',
  authMiddleware,
  adminMiddleware,
  refuseReservation
);

router.put(
  '/:id/annuler',
  authMiddleware,
  cancelReservation
);

router.put(
  '/:id/terminer',
  authMiddleware,
  adminMiddleware,
  finishReservation
);

module.exports = router;