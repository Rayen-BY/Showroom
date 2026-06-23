const rateLimit =
  require('express-rate-limit');

exports.loginLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 5,

    message: {
      success: false,
      message:
        'Trop de tentatives. Réessayez dans 15 minutes.',
    },
  });

exports.recommendationLimiter =
  rateLimit({
    windowMs:
      60 * 1000,

    max: 20,

    message: {
      success: false,
      message:
        'Trop de requêtes de recommandation.',
    },
  });