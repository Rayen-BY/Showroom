exports.calculateScore = (
  vehicule,
  criteria
) => {
  let score = 0;

  if (
    criteria.budgetMax &&
    vehicule.prix <= criteria.budgetMax
  ) {
    score += 30;
  }

  score +=
    Math.max(
      0,
      100 - vehicule.consommation * 10
    ) *
    (criteria.priorities.consommation || 0);

  score +=
    Math.max(
      0,
      100 - vehicule.kilometrage / 5000
    ) *
    (criteria.priorities.kilometrage || 0);

  score +=
    vehicule.annee *
    (criteria.priorities.annee || 0);

  score +=
    vehicule.nombrePlaces *
    (criteria.priorities.nombrePlaces || 0);

  return score;
};