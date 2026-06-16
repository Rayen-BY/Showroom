const mongoose = require('mongoose');

const marqueSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

marqueSchema.virtual('vehicules', {
  ref: 'Vehicule',
  localField: '_id',
  foreignField: 'marque',
});

marqueSchema.set('toJSON', { virtuals: true });
marqueSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Marque', marqueSchema);