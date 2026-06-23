exports.calculateScore = (
  vehicule,
  criteria
) => {

  let score = 0;

  // -----------------
  // MARQUES
  // -----------------

  if (
    criteria.marques?.length
  ) {

    const match =
      criteria.marques.some(
        marque =>
          vehicule.marque?.nom
            ?.toLowerCase()
            .includes(
              marque.toLowerCase()
            )
      );

    score +=
      match
        ? 10000
        : -10000;
  }

  // -----------------
  // MODELES
  // -----------------

  if (
    criteria.modeles?.length
  ) {

    const match =
      criteria.modeles.some(
        modele =>
          vehicule.modele
            .toLowerCase()
            .includes(
              modele.toLowerCase()
            )
      );

    score +=
      match
        ? 10000
        : -10000;
  }

  // -----------------
  // TYPE VEHICULE
  // -----------------

  if (
    criteria.typeVehicule?.length
  ) {

    const match =
      criteria.typeVehicule.includes(
        vehicule.typeVehicule
      );

    score +=
      match
        ? 3000
        : -3000;
  }

  // -----------------
  // BOITE
  // -----------------

  if (
    criteria.boiteVitesse?.length
  ) {

    const match =
      criteria.boiteVitesse.includes(
        vehicule.boiteVitesse
      );

    score +=
      match
        ? 2500
        : -2500;
  }

  // -----------------
  // CARBURANT
  // -----------------

  if (
    criteria.carburant?.length
  ) {

    const match =
      criteria.carburant.includes(
        vehicule.carburant
      );

    score +=
      match
        ? 2500
        : -2500;
  }

  // -----------------
  // PRIX MAX
  // -----------------

  if (
    criteria.prix?.max
  ) {

    if (
      vehicule.prix <=
      criteria.prix.max
    ) {

      score += 3000;

    } else {

      score -= 3000;
    }
  }

  // -----------------
  // PRIX MIN
  // -----------------

  if (
    criteria.prix?.min
  ) {

    if (
      vehicule.prix >=
      criteria.prix.min
    ) {

      score += 1000;
    }
  }

  // -----------------
  // CONSOMMATION MAX
  // -----------------

  if (
    criteria.consommation?.max
  ) {

    if (
      vehicule.consommation <=
      criteria.consommation.max
    ) {

      score += 3000;

    } else {

      score -= 3000;
    }
  }

  // -----------------
  // KILOMETRAGE MAX
  // -----------------

  if (
    criteria.kilometrage?.max
  ) {

    if (
      vehicule.kilometrage <=
      criteria.kilometrage.max
    ) {

      score += 2000;

    } else {

      score -= 2000;
    }
  }

  // -----------------
  // ANNEE MIN
  // -----------------

  if (
    criteria.annee?.min
  ) {

    if (
      vehicule.annee >=
      criteria.annee.min
    ) {

      score += 2000;

    } else {

      score -= 2000;
    }
  }

  // -----------------
  // NOMBRE PLACES
  // -----------------

  if (
    criteria.nombrePlaces?.min
  ) {

    if (
      vehicule.nombrePlaces >=
      criteria.nombrePlaces.min
    ) {

      score += 2000;

    } else {

      score -= 2000;
    }
  }

  // -----------------
  // BONUS QUALITÉ
  // -----------------

  score +=
    (
      (250000 - vehicule.prix)
      / 250000
    ) * 500;

  score +=
    (
      (10 - vehicule.consommation)
      / 10
    ) * 500;

  score +=
    (
      (200000 - vehicule.kilometrage)
      / 200000
    ) * 500;

  score +=
    (
      vehicule.annee - 2000
    ) * 20;

  return Math.round(score);
};