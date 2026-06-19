const mongoose = require('mongoose');
const Favori = require('../models/Favori');
const Vehicule = require('../models/Vehicule');

exports.addFavori = async (req, res) => {
  try {
    const { vehiculeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehiculeId)) {
      return res.status(400).json({
        success: false,
        message: 'ID véhicule invalide',
      });
    }

    const vehicule = await Vehicule.findById(vehiculeId);

    if (!vehicule) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    const existingFavori = await Favori.findOne({
      utilisateur: req.user.id,
      vehicule: vehiculeId,
    });

    if (existingFavori) {
      return res.status(409).json({
        success: false,
        message: 'Ce véhicule est déjà dans vos favoris',
      });
    }

    const favori = await Favori.create({
      utilisateur: req.user.id,
      vehicule: vehiculeId,
    });

    return res.status(201).json({
      success: true,
      message: 'Favori ajouté avec succès',
      data: favori,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFavoris = async (req, res) => {
  try {
    const favoris = await Favori.find({
      utilisateur: req.user.id,
    }).populate({
      path: 'vehicule',
      populate: {
        path: 'marque',
        select: 'nom',
      },
    });

    return res.status(200).json({
      success: true,
      count: favoris.length,
      data: favoris,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteFavori = async (req, res) => {
  try {
    const { vehiculeId } = req.params;

    const favori = await Favori.findOneAndDelete({
      utilisateur: req.user.id,
      vehicule: vehiculeId,
    });

    if (!favori) {
      return res.status(404).json({
        success: false,
        message: 'Favori introuvable',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Favori supprimé avec succès',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};