// scripts/listModels.js

require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

(async () => {

  console.log(
    'API KEY:',
    process.env.GEMINI_API_KEY?.slice(0, 10)
  );

  const models =
    await ai.models.list();

  console.log(models);

})();