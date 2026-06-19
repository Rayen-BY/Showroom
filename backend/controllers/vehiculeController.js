const Marque = require('../models/Marque');
const Vehicule = require('../models/Vehicule');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

const isEmpty = (value) => value === undefined || value === null || value === '';

exports.addVehicle = async (req, res) => {
  try {
    const {
      marqueId,
      marque,
      modele,
      prix,
      carburant,
      boiteVitesse,
      kilometrage,
      annee,
      typeVehicule,
      nombrePlaces,
      consommation,
      description,
      statut,
    } = req.body;

    const marqueReference = marqueId || marque;

    console.log('BODY =', req.body);
    console.log('FILES =', req.files);

    const missingFields = [];

  if (isEmpty(marqueReference)) missingFields.push('marqueId');
  if (isEmpty(modele)) missingFields.push('modele');
  if (isEmpty(prix)) missingFields.push('prix');
  if (isEmpty(carburant)) missingFields.push('carburant');
  if (isEmpty(boiteVitesse)) missingFields.push('boiteVitesse');
  if (isEmpty(kilometrage)) missingFields.push('kilometrage');
  if (isEmpty(annee)) missingFields.push('annee');
  if (isEmpty(typeVehicule)) missingFields.push('typeVehicule');
  if (isEmpty(nombrePlaces)) missingFields.push('nombrePlaces');
  if (isEmpty(consommation)) missingFields.push('consommation');
  if (isEmpty(description)) missingFields.push('description');
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs obligatoires doivent être renseignés',
      missingFields,
      body: req.body,
    });
  }

    const marqueExists = await Marque.findById(marqueReference);

    if (!marqueExists) {
      return res.status(404).json({
        success: false,
        message: 'Marque introuvable',
      });
    }

    const uploadedImages = Array.isArray(req.files)
      ? req.files.map((file) => `/uploads/vehicules/${file.filename}`)
      : [];

    const providedImages = Array.isArray(req.body.images)
      ? req.body.images
      : isEmpty(req.body.images)
      ? []
      : [req.body.images];

    const normalizedImages = [...providedImages, ...uploadedImages];

    const vehicule = await Vehicule.create({
      marque: marqueExists._id,
      modele,
      prix,
      carburant,
      boiteVitesse,
      kilometrage,
      annee,
      typeVehicule,
      nombrePlaces,
      consommation,
      description,
      statut,
      images: normalizedImages,
    });

    const createdVehicule = await Vehicule.findById(
      vehicule._id
    ).populate(
      'marque',
      'nom'
    );

    // Utilisateurs abonnés aux notifications
    const utilisateurs = await User.find({
      emailNotifications: true,
    });

    await Promise.all(
      utilisateurs.map((utilisateur) =>
        sendEmail({
          to: utilisateur.email,
          subject: '🚗 Nouveau véhicule disponible',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 700px;">

              <h1 style="color:#2563eb;">
                🚗 Nouveau véhicule disponible
              </h1>

              <p>
                Bonjour ${utilisateur.prenom},
              </p>

              <p>
                Un nouveau véhicule vient d'être ajouté à notre showroom.
              </p>

              <hr>

              <h3>Détails du véhicule</h3>

              <p>
                <strong>Marque :</strong>
                ${createdVehicule.marque.nom}
              </p>

              <p>
                <strong>Modèle :</strong>
                ${createdVehicule.modele}
              </p>

              <p>
                <strong>Année :</strong>
                ${createdVehicule.annee}
              </p>

              <p>
                <strong>Carburant :</strong>
                ${createdVehicule.carburant}
              </p>

              <p>
                <strong>Boîte :</strong>
                ${createdVehicule.boiteVitesse}
              </p>

              <p>
                <strong>Prix :</strong>
                ${Number(
                  createdVehicule.prix
                ).toLocaleString('fr-FR')} DT
              </p>

              ${
                createdVehicule.images?.length
                  ? `
                  <img
                    src="${createdVehicule.images[0]}"
                    width="450"
                    style="border-radius:8px;"
                  />
                  `
                  : ''
              }

              <hr>

              <p>
                Connectez-vous à la plateforme pour consulter la fiche complète.
              </p>

              <p>
                <strong>Showroom Automobile</strong>
              </p>

            </div>
          `,
        })
      )
    );

    return res.status(201).json({
      success: true,
      message: 'Véhicule ajouté avec succès',
      data: createdVehicule,
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

exports.updateVehicule = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID véhicule invalide',
      });
    }

    const vehicule = await Vehicule.findById(id);

    if (!vehicule) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    const {
      marqueId,
      marque,
      modele,
      prix,
      carburant,
      boiteVitesse,
      kilometrage,
      annee,
      typeVehicule,
      nombrePlaces,
      consommation,
      description,
      statut,
    } = req.body;

    const update = {};

    if (marqueId || marque) {
      const marqueReference = marqueId || marque;
      const marqueExists = await Marque.findById(marqueReference);

      if (!marqueExists) {
        return res.status(404).json({
          success: false,
          message: 'Marque introuvable',
        });
      }

      update.marque = marqueExists._id;
    }

    if (modele !== undefined) update.modele = modele;
    if (prix !== undefined) update.prix = prix;
    if (carburant !== undefined) update.carburant = carburant;
    if (boiteVitesse !== undefined) update.boiteVitesse = boiteVitesse;
    if (kilometrage !== undefined) update.kilometrage = kilometrage;
    if (annee !== undefined) update.annee = annee;
    if (typeVehicule !== undefined) update.typeVehicule = typeVehicule;
    if (nombrePlaces !== undefined) update.nombrePlaces = nombrePlaces;
    if (consommation !== undefined) update.consommation = consommation;
    if (description !== undefined) update.description = description;
    if (statut !== undefined) update.statut = statut;

    // Replace images if new files uploaded
    if (Array.isArray(req.files) && req.files.length > 0) {
      update.images = req.files.map((file) => `/uploads/vehicules/${file.filename}`);
    }

    const updatedVehicule = await Vehicule.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).populate('marque', 'nom');

    return res.status(200).json({
      success: true,
      message: 'Véhicule mis à jour',
      data: updatedVehicule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteVehicule = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'ID véhicule invalide' });
    }

    const vehicule = await Vehicule.findById(id);

    if (!vehicule) {
      return res.status(404).json({ success: false, message: 'Véhicule introuvable' });
    }

    // Delete images from filesystem if present
    if (Array.isArray(vehicule.images) && vehicule.images.length > 0) {
      for (const img of vehicule.images) {
        try {
          const filename = path.basename(img);
          const filePath = path.join(__dirname, '..', 'uploads', 'vehicules', filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (err) {
          // log and continue
          console.error('Failed to delete image file', img, err.message);
        }
      }
    }

    await Vehicule.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Véhicule supprimé avec succès' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVehiculeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID véhicule invalide',
      });
    }

    const vehicle = await Vehicule.findById(id).populate('marque', 'nom');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule introuvable',
      });
    }

    return res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.compareVehicules = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids || typeof ids !== 'string' || !ids.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Le paramètre ids est obligatoire',
      });
    }

    const vehicleIds = [...new Set(ids.split(',').map((id) => id.trim()).filter(Boolean))];

    if (vehicleIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Vous devez comparer au moins 2 véhicules',
      });
    }

    if (vehicleIds.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'Vous pouvez comparer au maximum 3 véhicules',
      });
    }

    const invalidIds = vehicleIds.filter((id) => !mongoose.Types.ObjectId.isValid(id));

    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Un ou plusieurs IDs véhicules sont invalides',
        invalidIds,
      });
    }

    const vehicles = await Vehicule.find({ _id: { $in: vehicleIds } }).populate('marque', 'nom');

    const orderedVehicles = vehicleIds
      .map((id) => vehicles.find((vehicle) => vehicle._id.toString() === id))
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      count: orderedVehicles.length,
      data: orderedVehicles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.searchVehicules = async (req, res) => {
  try {
    const {
      marque,
      modele,
      carburant,
      boiteVitesse,
      annee,
      typeVehicule,
      nombrePlaces,
      statut,
      prixMin,
      prixMax,
      kilometrageMin,
      kilometrageMax,
      consommationMin,
      consommationMax,
    } = req.query;

    const filter = {};

    // Marque
    if (marque) {
      if (mongoose.Types.ObjectId.isValid(marque)) {
        filter.marque = marque;
      } else {
        const marqueDoc = await Marque.findOne({
          nom: {
            $regex: `^${marque}$`,
            $options: 'i',
          },
        });

        if (!marqueDoc) {
          return res.status(200).json({
            success: true,
            count: 0,
            data: [],
          });
        }

        filter.marque = marqueDoc._id;
      }
    }

    // Modèle
    if (modele) {
      filter.modele = {
        $regex: modele,
        $options: 'i',
      };
    }

    // Carburant
    if (carburant) {
      filter.carburant = {
        $regex: `^${carburant}$`,
        $options: 'i',
      };
    }

    // Boîte de vitesse
    if (boiteVitesse) {
      filter.boiteVitesse = {
        $regex: `^${boiteVitesse}$`,
        $options: 'i',
      };
    }

    // Année
    if (annee) {
      filter.annee = Number(annee);
    }

    // Type véhicule
    if (typeVehicule) {
      filter.typeVehicule = {
        $regex: `^${typeVehicule}$`,
        $options: 'i',
      };
    }

    // Nombre de places
    if (nombrePlaces) {
      filter.nombrePlaces = Number(nombrePlaces);
    }

    // Statut
    if (statut) {
      filter.statut = {
        $regex: `^${statut}$`,
        $options: 'i',
      };
    }

    // Prix
    if (prixMin || prixMax) {
      filter.prix = {};

      if (prixMin) {
        filter.prix.$gte = Number(prixMin);
      }

      if (prixMax) {
        filter.prix.$lte = Number(prixMax);
      }
    }

    // Kilométrage
    if (kilometrageMin || kilometrageMax) {
      filter.kilometrage = {};

      if (kilometrageMin) {
        filter.kilometrage.$gte = Number(kilometrageMin);
      }

      if (kilometrageMax) {
        filter.kilometrage.$lte = Number(kilometrageMax);
      }
    }

    // Consommation
    if (consommationMin || consommationMax) {
      filter.consommation = {};

      if (consommationMin) {
        filter.consommation.$gte = Number(consommationMin);
      }

      if (consommationMax) {
        filter.consommation.$lte = Number(consommationMax);
      }
    }

    const vehicules = await Vehicule.find(filter)
      .populate('marque', 'nom')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: vehicules.length,
      data: vehicules,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};