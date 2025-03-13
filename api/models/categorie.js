const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define('categorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: false
});

module.exports = Categorie;