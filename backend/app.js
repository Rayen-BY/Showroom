require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectToDb = require('./config/connectToDb');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

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
