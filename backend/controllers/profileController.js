const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-motDePasse');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nom, prenom, telephone, photoProfil, emailNotifications } = req.body;

    const update = {};
    if (nom !== undefined) update.nom = nom;
    if (prenom !== undefined) update.prenom = prenom;
    if (telephone !== undefined) update.telephone = telephone;
    if (photoProfil !== undefined) update.photoProfil = photoProfil;
    if (typeof emailNotifications !== 'undefined') update.emailNotifications = !!emailNotifications;

    const updated = await User.findByIdAndUpdate(userId, update, { new: true, runValidators: true }).select('-motDePasse');

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};