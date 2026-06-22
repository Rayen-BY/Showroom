const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedUsers = async () => {

  await User.deleteMany();

  const password =
    await bcrypt.hash(
      'User123!',
      10
    );

  const users = [
    {
      nom: 'Admin',
      prenom: 'Showroom',
      email: 'admin@showroom.com',
      motDePasse: password,
      role: 'admin',
      emailNotifications: false,
    },

    {
      nom: 'Ben Ali',
      prenom: 'Mohamed',
      email: 'mohamed@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: true,
    },

    {
      nom: 'Trabelsi',
      prenom: 'Ahmed',
      email: 'ahmed@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: true,
    },

    {
      nom: 'Gharbi',
      prenom: 'Sami',
      email: 'sami@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: false,
    },

    {
      nom: 'Mansouri',
      prenom: 'Youssef',
      email: 'youssef@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: true,
    },

    {
      nom: 'Jlassi',
      prenom: 'Amine',
      email: 'amine@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: false,
    },

    {
      nom: 'Ben Salem',
      prenom: 'Walid',
      email: 'walid@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: true,
    },

    {
      nom: 'Ayari',
      prenom: 'Omar',
      email: 'omar@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: true,
    },

    {
      nom: 'Mejri',
      prenom: 'Nader',
      email: 'nader@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: false,
    },

    {
      nom: 'Kefi',
      prenom: 'Aymen',
      email: 'aymen@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: true,
    },

    {
      nom: 'Chaabane',
      prenom: 'Karim',
      email: 'karim@gmail.com',
      motDePasse: password,
      role: 'utilisateur',
      emailNotifications: false,
    },
  ];

  const createdUsers =
    await User.insertMany(users);

  console.log(
    `✅ ${createdUsers.length} utilisateurs créés`
  );

  return createdUsers;
};

module.exports = seedUsers;