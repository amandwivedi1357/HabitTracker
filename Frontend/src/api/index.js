import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (username, email, password) => {
  const response = await api.post('/auth/signup', { username, email, password });
  return response.data;
};

export const getHabits = async () => {
  const response = await api.get('/habits');
  return response.data;
};

export const createHabit = async (name) => {
  const response = await api.post('/habits', { name });
  return response.data;
};

export const updateHabit = async (id, name, completed) => {
  const response = await api.put(`/habits/${id}`, { name, completed });
  return response.data;
};

export default api;