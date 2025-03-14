import api from './api';

export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategorieById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};