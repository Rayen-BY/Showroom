const Marque = require('../models/Marque');

const marques = [
  { nom: 'BMW' },
  { nom: 'Mercedes' },
  { nom: 'Audi' },
  { nom: 'Volkswagen' },
  { nom: 'Toyota' },
  { nom: 'Peugeot' },
  { nom: 'Renault' },
  { nom: 'Hyundai' },
  { nom: 'Kia' },
  { nom: 'Ford' },
];

const seedMarques = async () => {
  await Marque.deleteMany();

  const createdMarques =
    await Marque.insertMany(marques);

  console.log(
    `✅ ${createdMarques.length} marques créées`
  );

  return createdMarques;
};

module.exports = seedMarques;