require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const connectToDb = require('./config/connectToDb');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const vehicleRoutes = require('./routes/vehiculeRoutes');
const marqueRoutes = require('./routes/marqueRoutes');
const favoriRoutes = require('./routes/favoriRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/vehicules', vehicleRoutes);
app.use('/api/marques', marqueRoutes);
app.use('/api/favoris', favoriRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/dashboard',dashboardRoutes);
app.use('/api/recommendations',recommendationRoutes);

app.use((error, req, res, next) => {
  if (error && error.message === 'Seules les images sont autorisées') {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  
  if (error && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Chaque image doit faire au maximum 5 Mo',
    });
  }

  if (error && error.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Vous pouvez envoyer au maximum 5 images',
    });
  }

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Erreur serveur',
    });
  }

  return next();
});

// Health route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();

module.exports = app;