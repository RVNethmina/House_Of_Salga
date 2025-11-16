// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api', 
  // Added /api to the default URL, which is common
});

API.interceptors.request.use((req) => {
  // Check for admin token first, then customer token
  const token = localStorage.getItem('aToken') || localStorage.getItem('cToken');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;