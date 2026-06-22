const {
  getRecommendations,
} = require('../services/recommendationService');

exports.recommend =
  async (req, res) => {
    try {
      const { message } = req.body;

      const result =
        await getRecommendations(
          message
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };