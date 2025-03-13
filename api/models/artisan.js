const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0
  },
  localisation: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'artisans',
  timestamps: false
});

module.exports = Artisan;