# Trouve ton artisan

Plateforme de mise en relation entre particuliers et artisans de la région Auvergne-Rhône-Alpes.

## Présentation

Cette application permet aux particuliers de trouver facilement un artisan et de le contacter via un formulaire. L'application propose une navigation par catégories d'artisanat et met en avant les meilleurs artisans de la région.

## Prérequis

- Node.js
- MySQL
- npm

## Structure du projet

- `/api` : Backend Node.js/Express
- `/front` : Frontend React

## Installation

### Base de données

1. Créez une base de données MySQL nommée `trouve_ton_artisan`
2. Exécutez les scripts SQL dans cet ordre :
   - `database/trouve_ton_artisan_categories.sql`
   - `database/trouve_ton_artisan_specialites.sql`
   - `database/trouve_ton_artisan_artisans.sql`

## Technologies utilisées

* **Backend** : Node.js, Express, Sequelize, MySQL
* **Frontend** : React, Bootstrap, CSS
* **Sécurité** : Helmet, CORS, validation des données

## Fonctionnalités

* Navigation par catégories d'artisanat
* Filtrage par spécialité
* Recherche d'artisans par nom
* Visualisation détaillée des profils d'artisans
* Formulaire de contact pour les artisans
* Design responsive (mobile, tablette, desktop)

### API Backend
Commandes pour démarrer l'API: 
cd api
npm run dev

### Frontend React
Commandes pour démarrer le front: 
cd front
npm start
