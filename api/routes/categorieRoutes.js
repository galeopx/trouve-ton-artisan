const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// GET /api/categories - Récupérer toutes les catégories
router.get('/', categorieController.getAllCategories);

// GET /api/categories/:id - Récupérer une catégorie par ID
router.get('/:id', categorieController.getCategorieById);

module.exports = router;