const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    vehicule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicule',
      required: true,
    },

    telephone: {
      type: String,
      required: true,
      trim: true,
    },

    dateSouhaitee: {
      type: Date,
      required: true,
    },

    commentaire: {
      type: String,
      trim: true,
    },

    statut: {
      type: String,
      enum: ['en_attente', 'acceptee', 'refusee','terminee','annulee'],
      default: 'en_attente',
    },

    dateFinale: {
      type: Date,
    },

    heureFinale: {
      type: String,
    },

    calendarEventId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reservation', reservationSchema);