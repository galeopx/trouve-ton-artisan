const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');

// Routes
const categorieRoutes = require('./routes/categorieRoutes');
const specialiteRoutes = require('./routes/specialiteRoutes');
const artisanRoutes = require('./routes/artisanRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://profound-klepon-dcdb26.netlify.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categories', categorieRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/artisans', artisanRoutes);

// Route de base pour tester l'API
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API Trouve ton artisan!' });
});

// Gestion d'erreurs
app.use(errorHandler);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});