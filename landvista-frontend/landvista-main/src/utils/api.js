import axios from 'axios';
import { getAuth, logout, getAdminAuth, adminLogout } from './auth';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: BASE_URL,
});


// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // 🧠 Separate Auth logic
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const auth = isAdminRoute ? getAdminAuth() : getAuth();

    if (auth && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      
      if (isAdminRoute) {
        adminLogout();
        if (!window.location.pathname.includes('admin-login')) {
          window.location.href = '/admin-login';
        }
      } else {
        logout();
        if (!window.location.pathname.includes('login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

