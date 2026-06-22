require('dotenv').config();

const connectToDb =
  require('../config/connectToDb');

const seedMarques =
  require('./seedMarques');

const seedVehicules =
  require('./seedVehicules');

const seedUsers =
  require('./seedUsers');

const runSeeder =
  async () => {
    try {
      await connectToDb();

      const marques =
        await seedMarques();

      await seedVehicules(
        marques
      );

      await seedUsers();

      console.log(
        '🎉 Base de données remplie'
      );

      process.exit(0);
    } catch (error) {
      console.error(error);

      process.exit(1);
    }
  };

runSeeder();