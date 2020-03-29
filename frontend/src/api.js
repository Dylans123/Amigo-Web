const axios = require('axios');

const api = axios.create({
  baseURL: '/api'
});

export const login = (email, password) => api.post(`/login`, { email, password });

const apis = {
  login
}

export default apis