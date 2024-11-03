import axios from 'axios';

//const API_URL = 'https://habittracker-backend-7g97.onrender.com/api';
const API_URL = 'https://backend-tau-ten-84.vercel.app/api';
//const API_URL = 'http://localhost:5000/api';

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
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const getHabits = async () => {
  try {
    const response = await api.get('/habits');
    return response.data;
  } catch (error) {
    console.error('Get habits error:', error);
    throw error;
  }
};
export const getHabitById = async (id) => {
  const response = await api.get(`/habits/${id}`);
  return response.data;
};

export const createHabit = async (name) => {
  try {
    const response = await api.post('/habits', { name });
    return response.data;
  } catch (error) {
    console.error('Create habit error:', error);
    throw error;
  }
};

export const updateHabit = async (id, habitData) => {
  try {
    const response = await api.put(`/habits/${id}`, habitData);
    return response.data;
  } catch (error) {
    console.error('Update habit error:', error);
    throw error;
  }
};

export const deleteHabit = async (id) => {
  try {
    const response = await api.delete(`/habits/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete habit error:', error);
    throw error;
  }
};

export default api;