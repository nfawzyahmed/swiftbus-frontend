// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'swiftbus-backend-production.up.railway.app', // your Spring Boot backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
