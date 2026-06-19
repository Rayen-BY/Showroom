const mongoose = require('mongoose');

const Reservation = require('../models/Reservation');
const Vehicule = require('../models/Vehicule');
const { sendEmail } = require('../services/emailService');
const User = require('../models/User');

exports.createReservation = async (req, res) => {
  try {
    const { vehiculeId } = req.params;

    const {
      telephone,
      dateSouhaitee,
      commentaire,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(vehiculeId)) {
      return res.status(400).json({
        success: false,
        message: 'ID véhicule invalide',
      });
    }

    const vehicule = await Vehicule.findById(vehiculeId)
      .populate('marque', 'nom');

    if (!vehicule) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    const reservation = await Reservation.create({
      utilisateur: req.user.id,
      vehicule: vehiculeId,
      telephone,
      dateSouhaitee,
      commentaire,
    });
    const utilisateur = await User.findById(req.user.id);
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'Nouvelle demande d’essai',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px;">

        <h1 style="color:#2563eb;">
          🚗 Nouvelle demande d'essai
        </h1>

        <p>
          Une nouvelle réservation d'essai a été créée sur la plateforme.
        </p>

        <hr>

        <h3>Véhicule concerné</h3>

        <p>
          <strong>Marque :</strong>
          ${vehicule.marque.nom}
        </p>

        <p>
          <strong>Modèle :</strong>
          ${vehicule.modele}
        </p>

        <p>
          <strong>Prix :</strong>
          ${vehicule.prix.toLocaleString('fr-FR')} DT
        </p>

        ${
          vehicule.images?.length
            ? `
            <img
              src="${vehicule.images[0]}"
              width="400"
              alt="Vehicule"
              style="border-radius:8px;"
            />
            `
            : ''
        }

        <hr>

        <h3>Informations du client</h3>

        <p>
          <strong>Nom :</strong>
          ${utilisateur.nom}
        </p>

        <p>
          <strong>Prénom :</strong>
          ${utilisateur.prenom}
        </p>

        <p>
          <strong>Email :</strong>
          ${utilisateur.email}
        </p>

        <p>
          <strong>Téléphone :</strong>
          ${telephone}
        </p>


        <p>
          <strong>Date souhaitée :</strong>
          ${new Date(dateSouhaitee).toLocaleString('fr-FR')}
        </p>

        <p>
          <strong>Commentaire :</strong>
        </p>

        <blockquote
          style="
            background:#f5f5f5;
            padding:10px;
            border-left:4px solid #2563eb;
          "
        >
          ${commentaire || 'Aucun commentaire'}
        </blockquote>

        <hr>

        <p>
          Connectez-vous au tableau de bord administrateur pour accepter ou refuser cette demande.
        </p>

        <p>
          <strong>Showroom Automobile</strong>
        </p>

      </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message: 'Demande d\'essai créée avec succès',
      data: reservation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('utilisateur', 'nom prenom email')
      .populate({
        path: 'vehicule',
        populate: {
          path: 'marque',
          select: 'nom',
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.acceptReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      dateFinale,
      heureFinale,
    } = req.body;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
          return res.status(404).json({
            success: false,
            message: 'Réservation introuvable',
          });
        }

        reservation.statut = 'acceptee';
        reservation.dateFinale = dateFinale;
        reservation.heureFinale = heureFinale;

        await reservation.save();
        const utilisateur = await User.findById(
      reservation.utilisateur
    );

    await sendEmail({
      to: utilisateur.email,
      subject: 'Réservation acceptée',
      html: `
        <div style="font-family: Arial, sans-serif;">

          <h1 style="color:green;">
            ✅ Réservation acceptée
          </h1>

          <p>
            Votre demande d'essai a été acceptée.
          </p>

          <p><strong>Date :</strong> ${dateFinale}</p>

          <p><strong>Heure :</strong> ${heureFinale}</p>

          <p>
            Nous vous attendons au showroom.
          </p>

          <br>

          <p>
            Merci pour votre confiance.
          </p>

          <p>
            <strong>Équipe Showroom Automobile</strong>
          </p>

        </div>
        `
    });

    return res.status(200).json({
      success: true,
      message: 'Réservation acceptée',
      data: reservation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.refuseReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation introuvable',
      });
    }

    reservation.statut = 'refusee';

    await reservation.save();
    const utilisateur = await User.findById(
      reservation.utilisateur
    );

    await sendEmail({
      to: utilisateur.email,
      subject: 'Réservation refusée',
      html: `
        <div style="font-family: Arial, sans-serif;">

          <h1 style="color:#dc2626;">
            ❌ Réservation refusée
          </h1>

          <p>
            Nous sommes désolés, votre demande d'essai n'a pas pu être acceptée.
          </p>

          <p>
            Vous pouvez effectuer une nouvelle demande à une autre date.
          </p>

          <br>

          <p>
            <strong>Équipe Showroom Automobile</strong>
          </p>

        </div>
        `
    });

    return res.status(200).json({
      success: true,
      message: 'Réservation refusée',
      data: reservation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation introuvable',
      });
    }

    if (reservation.utilisateur.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès interdit',
      });
    }

    if (
      reservation.statut === 'refusee' ||
      reservation.statut === 'annulee' ||
      reservation.statut === 'terminee'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Cette réservation ne peut plus être annulée',
      });
    }

    reservation.statut = 'annulee';

    await reservation.save();

    const utilisateur = await User.findById(
      reservation.utilisateur
    );

    const vehicule = await Vehicule.findById(
      reservation.vehicule
    ).populate('marque', 'nom');

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'Annulation de réservation',
      html: `
        <div style="font-family: Arial, sans-serif;">

          <h1 style="color:#f59e0b;">
            ⚠️ Réservation annulée
          </h1>

          <p>
            Une réservation a été annulée par le client.
          </p>

          <hr>

          <h3>Client</h3>

          <p><strong>Nom :</strong> ${utilisateur.nom}</p>
          <p><strong>Prénom :</strong> ${utilisateur.prenom}</p>
          <p><strong>Email :</strong> ${utilisateur.email}</p>

          <hr>

          <h3>Véhicule</h3>

          <p>
            <strong>Marque :</strong>
            ${vehicule.marque.nom}
          </p>

          <p>
            <strong>Modèle :</strong>
            ${vehicule.modele}
          </p>

          <hr>

          <p>
            La réservation a été annulée par le client.
          </p>

          <p>
            <strong>Showroom Automobile</strong>
          </p>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Réservation annulée avec succès',
      data: reservation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.finishReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation introuvable',
      });
    }

    if (reservation.statut !== 'acceptee') {
      return res.status(400).json({
        success: false,
        message: 'Seule une réservation acceptée peut être terminée',
      });
    }

    reservation.statut = 'terminee';

    await reservation.save();

    return res.status(200).json({
      success: true,
      message: 'Réservation marquée comme terminée',
      data: reservation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};