const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.extractCriteria = async (message) => {
  const prompt = `
Tu es un assistant spécialisé en recommandation automobile.

Tu dois analyser le besoin utilisateur et retourner UNIQUEMENT un JSON valide.

Champs disponibles :

marque
modele
prix
carburant
boiteVitesse
kilometrage
annee
typeVehicule
nombrePlaces
consommation

Exemples :

"voiture économique"
=> priorité prix faible et consommation faible

"voiture familiale"
=> priorité nombrePlaces et typeVehicule

"ville"
=> priorité consommation faible

Réponds uniquement au format JSON :

{
  "budgetMax": null,
  "marque": null,
  "usage": null,
  "carburant": null,
  "boiteVitesse": null,
  "nombrePlacesMin": null,
  "priorities": {
    "prix": 0,
    "consommation": 0,
    "annee": 0,
    "kilometrage": 0,
    "nombrePlaces": 0
  }
}

Message utilisateur :

${message}
`;

  const response =
    await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

  return JSON.parse(
    response.text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()
  );
};