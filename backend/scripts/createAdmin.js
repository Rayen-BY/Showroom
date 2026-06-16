require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const connectToDb = require('../config/connectToDb');
const User = require('../models/User');

const adminData = {
  email: 'admin@test.com',
  password: 'Admin2026',
  nom: 'Admin',
  prenom: 'System',
  role: 'admin',
};

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectToDb();

    const existingAdmin = await User.findOne({
      email: adminData.email,
    });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    await User.create({
      nom: adminData.nom,
      prenom: adminData.prenom,
      email: adminData.email,
      motDePasse: hashedPassword,
      role: adminData.role,
    });

    console.log('Admin account created successfully');
    console.log(`Email: ${adminData.email}`);
  } catch (error) {
    console.error('Admin seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('MongoDB connection closed');
    }
  }
};

createAdmin();
