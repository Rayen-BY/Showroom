const axios = require('axios');

exports.sendTelegramMessage = async (
  message
) => {
  try {
    const token =
      process.env.TELEGRAM_BOT_TOKEN;

    const chatId =
      process.env.TELEGRAM_CHAT_ID;

    await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
      }
    );

    console.log(
      'Telegram notification sent'
    );
  } catch (error) {
    console.error(
      'Telegram Error:',
      error.response?.data ||
        error.message
    );
  }
};