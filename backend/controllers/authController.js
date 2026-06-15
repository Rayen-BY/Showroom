const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    console.log('req.body reçu:', req.body);
    const { nom, prenom, email, motDePasse } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email déjà utilisé',
      });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    await User.create({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
      role: 'utilisateur',
    });

    return res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
    });
    } catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};
