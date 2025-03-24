import axios from 'axios';

// Création d'une instance Axios avec l'URL de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://trouve-ton-artisan-api.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;