const sequelize = require('../config/database');
const Categorie = require('./categorie');
const Specialite = require('./specialite');
const Artisan = require('./artisan');

// Définir les associations
Categorie.hasMany(Specialite, { foreignKey: 'categorie_id' });
Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id' });

Specialite.hasMany(Artisan, { foreignKey: 'specialite_id' });
Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id' });

module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan
};