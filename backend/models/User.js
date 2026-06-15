const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
    },
    prenom: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    motDePasse: {
      type: String,
      required: true,
    },
    photoProfil: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['utilisateur', 'admin'],
      default: 'utilisateur',
    },
    emailNotifications: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
