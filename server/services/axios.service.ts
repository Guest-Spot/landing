import axios from 'axios';

// Create an axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.NUXT_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
