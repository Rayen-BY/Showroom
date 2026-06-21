require('dotenv').config();

const {
  sendTelegramMessage,
} = require('../services/telegramService');

sendTelegramMessage(
  '🚗 Test notification showroom'
);