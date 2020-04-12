const axios = require('axios');

const api = axios.create({
  baseURL: '/api'
});

export const login = (email, password) => api.post('/login', { email, password });
export const verify = (jwt) => api.get(`/verify?${jwt}`);

const apis = {
  login,
  verify
}

export default apis