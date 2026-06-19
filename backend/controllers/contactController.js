const { sendEmail } = require('../services/emailService');

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

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `📩 Contact : ${sujet}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px;">

          <h1 style="color:#2563eb;">
            📩 Nouveau message de contact
          </h1>

          <hr>

          <p>
            <strong>Nom :</strong>
            ${nom}
          </p>

          <p>
            <strong>Prénom :</strong>
            ${prenom}
          </p>

          <p>
            <strong>Email :</strong>
            ${email}
          </p>

          <p>
            <strong>Téléphone :</strong>
            ${telephone}
          </p>

          <p>
            <strong>Sujet :</strong>
            ${sujet}
          </p>

          <hr>

          <p>
            <strong>Message :</strong>
          </p>

          <blockquote
            style="
              background:#f5f5f5;
              padding:10px;
              border-left:4px solid #2563eb;
            "
          >
            ${message}
          </blockquote>

        </div>
      `,
    });

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