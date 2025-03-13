const { Categorie } = require('../models');

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
};

// Récupérer une catégorie par ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.status(200).json(categorie);
  } catch (error) {
    console.error('Error getting category:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie' });
  }
};