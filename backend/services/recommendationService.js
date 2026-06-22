const Vehicule = require('../models/Vehicule');

const {
  extractCriteria,
} = require('./aiService');

const {
  calculateScore,
} = require('./scoringService');

exports.getRecommendations =
  async (message) => {

    const criteria =
      await extractCriteria(message);

    const vehicules =
      await Vehicule.find()
        .populate('marque', 'nom');

    const scored =
      vehicules.map((vehicule) => ({
        vehicule,
        score:
          calculateScore(
            vehicule,
            criteria
          ),
      }));

    scored.sort(
      (a, b) => b.score - a.score
    );

    return {
      criteria,
      recommendations:
        scored.slice(0, 3),
    };
  };