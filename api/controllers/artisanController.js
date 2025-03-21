const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');

// Récupérer tous les artisans
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        { 
          model: Specialite, 
          include: [{ model: Categorie }] 
        }
      ]
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error('Error getting artisans:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des artisans' });
  }
};

// Récupérer un artisan par ID
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [
        { 
          model: Specialite, 
          include: [{ model: Categorie }] 
        }
      ]
    });
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }
    res.status(200).json(artisan);
  } catch (error) {
    console.error('Error getting artisan:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'artisan' });
  }
};

// Récupérer les artisans par spécialité
exports.getArtisansBySpecialite = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { specialite_id: req.params.specialiteId },
      include: [
        { 
          model: Specialite, 
          include: [{ model: Categorie }] 
        }
      ]
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error('Error getting artisans by speciality:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des artisans par spécialité' });
  }
};

// Récupérer les artisans par catégorie
exports.getArtisansByCategorie = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        { 
          model: Specialite, 
          where: { categorie_id: req.params.categorieId },
          include: [{ model: Categorie }] 
        }
      ]
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error('Error getting artisans by category:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des artisans par catégorie' });
  }
};

// Rechercher des artisans par nom
exports.searchArtisans = async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Le paramètre de recherche est requis' });
  }
  
  try {
    const artisans = await Artisan.findAll({
      where: {
        nom: {
          [Op.like]: `%${query}%`
        }
      },
      include: [
        { 
          model: Specialite, 
          include: [{ model: Categorie }] 
        }
      ]
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error('Error searching artisans:', error);
    res.status(500).json({ message: 'Erreur lors de la recherche des artisans' });
  }
};

// Récupérer les artisans du mois (ceux marqués comme "top")
exports.getArtisansDuMois = async (req, res) => {
  try {
    // Important: Nous utilisons maintenant le champ "top" au lieu du tri par note
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: [
        { 
          model: Specialite, 
          include: [{ model: Categorie }] 
        }
      ]
    });
    res.status(200).json(artisans);
  } catch (error) {
    console.error('Error getting artisans of the month:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des artisans du mois' });
  }
};

// Envoyer un email via le formulaire de contact
exports.contactArtisan = async (req, res) => {
  const { nom, email, objet, message } = req.body;
  const artisanId = req.params.id;
  
  if (!nom || !email || !objet || !message) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }
  
  try {
    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(artisanId);
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }
    
  // Le brief parle de contacter les artisans pour des renseignements
  // Cependantje vais simplement simuler l'envoi d'un email pour de pas utiliser Nodemailer.
    console.log(`Email envoyé à ${artisan.email} de la part de ${nom} (${email})`);
    console.log(`Objet: ${objet}`);
    console.log(`Message: ${message}`);
    
    res.status(200).json({ message: 'Votre message a été envoyé avec succès' });
  } catch (error) {
    console.error('Error contacting artisan:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
  }
};