const mongoose = require('mongoose');

const vehiculeSchema = new mongoose.Schema(
  {
    marque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Marque',
      required: true,
    },
    modele: {
      type: String,
      required: true,
      trim: true,
    },
    prix: {
      type: Number,
      required: true,
      min: 0,
    },
    carburant: {
      type: String,
      required: true,
      trim: true,
    },
    boiteVitesse: {
      type: String,
      required: true,
      trim: true,
    },
    kilometrage: {
      type: Number,
      required: true,
      min: 0,
    },
    annee: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    typeVehicule: {
      type: String,
      required: true,
      trim: true,
    },
    nombrePlaces: {
      type: Number,
      required: true,
      min: 1,
    },
    consommation: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    statut: {
      type: String,
      required: true,
      trim: true,
      default: 'Disponible',
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

vehiculeSchema.index({ marque: 1, modele: 1 });

module.exports = mongoose.model('Vehicule', vehiculeSchema);