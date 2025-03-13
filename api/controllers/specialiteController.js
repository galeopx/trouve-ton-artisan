const { Specialite, Categorie } = require('../models');

// Récupérer toutes les spécialités
exports.getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      include: [{ model: Categorie, attributes: ['id', 'nom'] }]
    });
    res.status(200).json(specialites);
  } catch (error) {
    console.error('Error getting specialites:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des spécialités' });
  }
};

// Récupérer une spécialité par ID
exports.getSpecialiteById = async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id, {
      include: [{ model: Categorie, attributes: ['id', 'nom'] }]
    });
    if (!specialite) {
      return res.status(404).json({ message: 'Spécialité non trouvée' });
    }
    res.status(200).json(specialite);
  } catch (error) {
    console.error('Error getting speciality:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la spécialité' });
  }
};

// Récupérer les spécialités par catégorie
exports.getSpecialitesByCategorie = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      where: { categorie_id: req.params.categorieId },
      include: [{ model: Categorie, attributes: ['id', 'nom'] }]
    });
    res.status(200).json(specialites);
  } catch (error) {
    console.error('Error getting specialities by category:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des spécialités par catégorie' });
  }
};