const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

// GET /api/artisans - Récupérer tous les artisans
router.get('/', artisanController.getAllArtisans);

// GET /api/artisans/search - Rechercher des artisans par nom
router.get('/search', artisanController.searchArtisans);

// GET /api/artisans/mois - Récupérer les artisans du mois
router.get('/mois', artisanController.getArtisansDuMois);

// GET /api/artisans/:id - Récupérer un artisan par ID
router.get('/:id', artisanController.getArtisanById);

// GET /api/artisans/specialite/:specialiteId - Récupérer les artisans par spécialité
router.get('/specialite/:specialiteId', artisanController.getArtisansBySpecialite);

// GET /api/artisans/categorie/:categorieId - Récupérer les artisans par catégorie
router.get('/categorie/:categorieId', artisanController.getArtisansByCategorie);

// POST /api/artisans/:id/contact - Contacter un artisan
router.post('/:id/contact', artisanController.contactArtisan);

module.exports = router;