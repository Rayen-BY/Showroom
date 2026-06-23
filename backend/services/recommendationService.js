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

    console.log(
      JSON.stringify(
        criteria,
        null,
        2
      )
    );

    const hasCriteria =
      criteria.marques?.length ||
      criteria.modeles?.length ||
      criteria.typeVehicule?.length ||
      criteria.carburant?.length ||
      criteria.boiteVitesse?.length ||
      criteria.prix?.min ||
      criteria.prix?.max ||
      criteria.annee?.min ||
      criteria.annee?.max ||
      criteria.kilometrage?.min ||
      criteria.kilometrage?.max ||
      criteria.nombrePlaces?.min ||
      criteria.nombrePlaces?.max ||
      criteria.consommation?.min ||
      criteria.consommation?.max;

    if (!hasCriteria) {

      return {
        criteria,
        warnings: [],
        message:
          "Je n'ai pas compris votre besoin automobile. Veuillez préciser votre recherche.",
        recommendations: [],
      };

    }

    let vehicules =
      await Vehicule.find()
        .populate('marque', 'nom');

    const warnings = [];

    const availableMarques = [
      ...new Set(
        vehicules.map(
          v => v.marque?.nom
        )
      )
    ];

    const availableTypes = [
      ...new Set(
        vehicules.map(
          v => v.typeVehicule
        )
      )
    ];

    const availableCarburants = [
      ...new Set(
        vehicules.map(
          v => v.carburant
        )
      )
    ];

    const availableBoites = [
      ...new Set(
        vehicules.map(
          v => v.boiteVitesse
        )
      )
    ];

    // -------------------
    // FILTRES STRICTS
    // -------------------

    if (criteria.prix?.max) {

      vehicules =
        vehicules.filter(
          v =>
            v.prix <=
            criteria.prix.max
        );
    }

    if (criteria.prix?.min) {

      vehicules =
        vehicules.filter(
          v =>
            v.prix >=
            criteria.prix.min
        );
    }

    if (
      criteria.nombrePlaces?.min
    ) {

      vehicules =
        vehicules.filter(
          v =>
            v.nombrePlaces >=
            criteria.nombrePlaces.min
        );
    }

    if (
      criteria.nombrePlaces?.max
    ) {

      vehicules =
        vehicules.filter(
          v =>
            v.nombrePlaces <=
            criteria.nombrePlaces.max
        );
    }

    // -------------------
    // MARQUES
    // -------------------

    if (
      criteria.marques?.length
    ) {

      const validMarques =
        criteria.marques.filter(
          marque =>
            availableMarques.some(
              m =>
                m.toLowerCase()
                  .includes(
                    marque.toLowerCase()
                  )
            )
        );

      const invalidMarques =
        criteria.marques.filter(
          marque =>
            !validMarques.includes(
              marque
            )
        );

      invalidMarques.forEach(
        marque =>
          warnings.push(
            `La marque "${marque}" n'existe pas dans notre catalogue.`
          )
      );

      if (
        validMarques.length
      ) {

        const filtered =
          vehicules.filter(
            v =>
              validMarques.some(
                marque =>
                  v.marque.nom
                    .toLowerCase()
                    .includes(
                      marque.toLowerCase()
                    )
              )
          );

        if (
          filtered.length > 0
        ) {
          vehicules =
            filtered;
        }
      }
    }

    // -------------------
    // TYPE VEHICULE
    // -------------------

    if (
      criteria.typeVehicule?.length
    ) {

      const validTypes =
        criteria.typeVehicule.filter(
          type =>
            availableTypes.includes(
              type
            )
        );

      const invalidTypes =
        criteria.typeVehicule.filter(
          type =>
            !validTypes.includes(
              type
            )
        );

      invalidTypes.forEach(
        type =>
          warnings.push(
            `Le type de véhicule "${type}" n'existe pas dans notre catalogue.`
          )
      );

      if (
        validTypes.length
      ) {

        const filtered =
          vehicules.filter(
            v =>
              validTypes.includes(
                v.typeVehicule
              )
          );

        if (
          filtered.length > 0
        ) {
          vehicules =
            filtered;
        }
      }
    }

    // -------------------
    // BOITE VITESSE
    // -------------------

    if (
      criteria.boiteVitesse?.length
    ) {

      const validBoites =
        criteria.boiteVitesse.filter(
          boite =>
            availableBoites.includes(
              boite
            )
        );

      if (
        validBoites.length
      ) {

        const filtered =
          vehicules.filter(
            v =>
              validBoites.includes(
                v.boiteVitesse
              )
          );

        if (
          filtered.length > 0
        ) {
          vehicules =
            filtered;
        }
      }
    }

    // -------------------
    // CARBURANT
    // -------------------

    if (
      criteria.carburant?.length
    ) {

      const validCarburants =
        criteria.carburant.filter(
          carburant =>
            availableCarburants.includes(
              carburant
            )
        );

      if (
        validCarburants.length
      ) {

        const filtered =
          vehicules.filter(
            v =>
              validCarburants.includes(
                v.carburant
              )
          );

        if (
          filtered.length > 0
        ) {
          vehicules =
            filtered;
        }
      }
    }

    // -------------------
    // SCORE
    // -------------------

    const scored =
      vehicules
        .map(
          (vehicule) => ({
            vehicule,
            score:
              calculateScore(
                vehicule,
                criteria
              ),
          })
        )
        .filter(
          item =>
            item.score > 0
        );

    scored.sort(
      (a, b) =>
        b.score - a.score
    );

    if (!scored.length) {
      return {
        criteria,
        warnings,
        message:
          'Aucun véhicule ne correspond suffisamment à votre recherche.',
        recommendations: [],
      };
    }

    return {
      criteria,
      warnings,
      message:
        warnings.length
          ? 'Certaines préférences ne sont pas disponibles dans notre catalogue. Nous vous proposons les véhicules les plus proches.'
          : null,
      recommendations:
        scored.slice(0, 3),
    };
  };