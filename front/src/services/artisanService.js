import api from './api';

export const getAllArtisans = async () => {
  const response = await api.get('/artisans');
  return response.data;
};

export const getArtisanById = async (id) => {
  const response = await api.get(`/artisans/${id}`);
  return response.data;
};

export const getArtisansByCategorie = async (categorieId) => {
  const response = await api.get(`/artisans/categorie/${categorieId}`);
  return response.data;
};

export const getArtisansDuMois = async () => {
  const response = await api.get('/artisans/mois');
  return response.data;
};

export const searchArtisans = async (query) => {
  const response = await api.get(`/artisans/search?query=${query}`);
  return response.data;
};

export const contactArtisan = async (id, formData) => {
  const response = await api.post(`/artisans/${id}/contact`, formData);
  return response.data;
};