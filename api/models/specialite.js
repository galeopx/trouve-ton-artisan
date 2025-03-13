const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialite = sequelize.define('specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'specialites',
  timestamps: false
});

module.exports = Specialite;