import axios from 'axios';

// Create an instance pointing to your Express backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Interceptor to automatically add the JWT token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;