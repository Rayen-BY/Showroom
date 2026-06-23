const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.extractCriteria = async (message) => {

  const prompt = `
    Tu es un moteur d'extraction sémantique automobile.

    Tu dois analyser le message utilisateur et retourner UNIQUEMENT un JSON valide.

    Tu peux uniquement utiliser les attributs suivants :

    marques
    modeles
    typeVehicule
    carburant
    boiteVitesse
    prix
    annee
    kilometrage
    nombrePlaces
    consommation

    Interprétations implicites :

    "faible consommation"
    → consommation.max = 6

    "économique"
    → consommation.max = 6

    "faible kilométrage"
    → kilometrage.max = 50000

    "récent"
    → annee.min = 2021

    "familiale"
    → nombrePlaces.min = 5
    → typeVehicule = SUV ou Berline

    "ville"
    → typeVehicule = Citadine

    Format obligatoire :

    {
      "marques": [],
      "modeles": [],

      "typeVehicule": [],
      "carburant": [],
      "boiteVitesse": [],

      "prix": {
        "min": null,
        "max": null
      },

      "annee": {
        "min": null,
        "max": null
      },

      "kilometrage": {
        "min": null,
        "max": null
      },

      "nombrePlaces": {
        "min": null,
        "max": null
      },

      "consommation": {
        "min": null,
        "max": null
      }
    }

    Règles :

    - Tu peux déduire des informations implicites.
    - Tu peux proposer plusieurs valeurs.
    - N'invente pas des données numériques absentes.
    - Si une information est inconnue, retourne null ou [].
    - Ne retourne jamais autre chose que le JSON.

    Exemples :

    Message :
    "Je suis commercial"

    Réponse :
    {
      "marques": [],
      "modeles": [],
      "typeVehicule": ["Berline", "SUV"],
      "carburant": ["Diesel", "Hybride"],
      "boiteVitesse": ["Automatique"],
      "prix": { "min": null, "max": null },
      "annee": { "min": null, "max": null },
      "kilometrage": { "min": null, "max": null },
      "nombrePlaces": { "min": null, "max": null },
      "consommation": { "min": null, "max": null }
    }

    Message utilisateur :

    ${message}
    `;

  const response =
  await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: prompt,
  });

  try {
    const text = response.text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const jsonMatch =
      text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(
        'Aucun JSON trouvé dans la réponse Gemini'
      );
    }

    const criteria =
      JSON.parse(jsonMatch[0]);

    return criteria;

  } catch (error) {

    console.error(
      'Erreur parsing Gemini :',
      error.message
    );

    return {
      marques: [],
      modeles: [],
      typeVehicule: [],
      carburant: [],
      boiteVitesse: [],
      prix: {
        min: null,
        max: null,
      },
      annee: {
        min: null,
        max: null,
      },
      kilometrage: {
        min: null,
        max: null,
      },
      nombrePlaces: {
        min: null,
        max: null,
      },
      consommation: {
        min: null,
        max: null,
      },
    };

  }
};