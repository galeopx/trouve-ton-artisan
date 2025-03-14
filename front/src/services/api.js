import axios from 'axios';

// Création d'une instance Axios avec l'URL de base
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;