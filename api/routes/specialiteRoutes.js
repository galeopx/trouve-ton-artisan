const express = require('express');
const router = express.Router();
const specialiteController = require('../controllers/specialiteController');

// GET /api/specialites - Récupérer toutes les spécialités
router.get('/', specialiteController.getAllSpecialites);

// GET /api/specialites/:id - Récupérer une spécialité par ID
router.get('/:id', specialiteController.getSpecialiteById);

// GET /api/specialites/categorie/:categorieId - Récupérer les spécialités par catégorie
router.get('/categorie/:categorieId', specialiteController.getSpecialitesByCategorie);

module.exports = router;