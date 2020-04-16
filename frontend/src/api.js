const axios = require('axios');

const api = axios.create({
  baseURL: '/api'
});

export const login = (email, password) => api.post('/admin/login', { email, password });
export const verify = (jwt) => api.get(`/verify?token=${jwt}`);

const apis = {
  login,
  verify
}

export default apis