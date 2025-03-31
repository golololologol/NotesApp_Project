import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api'; // Adjust as necessary

const api = axios.create({
  baseURL: API_BASE_URL
});

// Attach token from localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear token and set logout reason
      localStorage.removeItem('token');
      localStorage.setItem('logoutReason', 'Your session has expired. Please log in again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
