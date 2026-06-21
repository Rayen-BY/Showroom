const User = require('../models/User');
const Vehicule = require('../models/Vehicule');
const Favori = require('../models/Favori');
const Reservation = require('../models/Reservation');

exports.getDashboard = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [
    totalUsers,
    totalVehicules,
    totalFavoris,
    totalReservations,
    emailSubscribers,
    todayReservations,
    ] = await Promise.all([
    User.countDocuments(),
    Vehicule.countDocuments(),
    Favori.countDocuments(),
    Reservation.countDocuments(),
    User.countDocuments({
        emailNotifications: true,
    }),
    Reservation.countDocuments({
        createdAt: {
        $gte: startOfDay,
        },
    }),
    ]);

    const reservationStats =
      await Reservation.aggregate([
        {
          $group: {
            _id: '$statut',
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    const topFavoriteVehicles =
      await Favori.aggregate([
        {
          $group: {
            _id: '$vehicule',
            totalFavoris: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalFavoris: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: 'vehicules',
            localField: '_id',
            foreignField: '_id',
            as: 'vehicule',
          },
        },
        {
          $unwind: '$vehicule',
        },
        {
          $project: {
            _id: 0,
            modele: '$vehicule.modele',
            totalFavoris: 1,
          },
        },
      ]);

    const topReservedVehicles =
      await Reservation.aggregate([
        {
          $group: {
            _id: '$vehicule',
            totalReservations: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalReservations: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: 'vehicules',
            localField: '_id',
            foreignField: '_id',
            as: 'vehicule',
          },
        },
        {
          $unwind: '$vehicule',
        },
        {
          $project: {
            _id: 0,
            modele: '$vehicule.modele',
            totalReservations: 1,
          },
        },
      ]);

    const recentReservations =
      await Reservation.find()
        .populate(
          'utilisateur',
          'nom prenom'
        )
        .populate(
          'vehicule',
          'modele'
        )
        .sort({
          createdAt: -1,
        })
        .limit(5);

    return res.status(200).json({
      success: true,

      data: {
        totalUsers,
        totalVehicules,
        totalFavoris,
        totalReservations,

        emailSubscribers,
        
        todayReservations,
        reservationStats,

        topFavoriteVehicles,

        topReservedVehicles,

        recentReservations,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};