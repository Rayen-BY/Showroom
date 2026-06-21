const {sendTelegramMessage,} = require('../services/telegramService');

exports.contactUs = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      telephone,
      sujet,
      message,
    } = req.body;

    if (
      !nom ||
      !prenom ||
      !email ||
      !telephone ||
      !sujet ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont obligatoires',
      });
    }

    await sendTelegramMessage(`
      📩 NOUVEAU MESSAGE CONTACT

      Nom :
      ${prenom} ${nom}

      Email :
      ${email}

      Téléphone :
      ${telephone}

      Sujet :
      ${sujet}

      Message :
      ${message}
      `);

    return res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};