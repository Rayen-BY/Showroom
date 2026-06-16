const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uploadVehiculeMiddleware');
const { addVehicle, updateVehicule, deleteVehicule, searchVehicules, getVehiculeById, compareVehicules } = require('../controllers/vehiculeController');

const router = express.Router();

// Public search endpoint
router.get('/', searchVehicules);
router.get('/comparer', compareVehicules);
router.get('/:id', getVehiculeById);

router.post('/', authMiddleware, adminMiddleware, upload.array('images', 5), addVehicle);
router.put('/:id', authMiddleware, adminMiddleware, upload.array('images', 5), updateVehicule);
router.delete('/:id', authMiddleware, adminMiddleware, deleteVehicule);

module.exports = router;