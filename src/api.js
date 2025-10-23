import axios from 'axios';

const APIURL = 'https://localhost:7285/api'; // Replace with your API URL

export const api = axios.create({
  baseURL: APIURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
