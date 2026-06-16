const Marque = require('../models/Marque');

exports.addMarque = async (req, res) => {
  try {
    const { nom } = req.body;

    if (!nom || !nom.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Le nom de la marque est obligatoire',
      });
    }

    const normalizedNom = nom.trim();

    const existingMarque = await Marque.findOne({
      nom: { $regex: `^${normalizedNom}$`, $options: 'i' },
    });

    if (existingMarque) {
      return res.status(409).json({
        success: false,
        message: 'Cette marque existe déjà',
      });
    }

    const marque = await Marque.create({ nom: normalizedNom });

    return res.status(201).json({
      success: true,
      message: 'Marque ajoutée avec succès',
      data: marque,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};