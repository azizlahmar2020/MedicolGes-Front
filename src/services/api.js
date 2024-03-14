// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Update with your backend API URL
});

export default api;