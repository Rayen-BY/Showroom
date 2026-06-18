const mongoose = require('mongoose');

const favoriSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

favoriSchema.index(
  {
    utilisateur: 1,
    vehicule: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model('Favori', favoriSchema);