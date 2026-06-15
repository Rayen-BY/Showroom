require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectToDb = require('./config/connectToDb');
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

// Health route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});
/*une route technique de test. Sert a verifier :
✓ Express démarre
✓ Le serveur écoute sur le bon port
✓ Les routes fonctionnent */


// Start server after DB connection
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
