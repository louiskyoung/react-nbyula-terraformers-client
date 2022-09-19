import axios from 'axios';

const apiService = axios.create({
  baseURL:
    `${process.env.REACT_APP_SERVER_URL}/api` || 'https://localhost:8000/api',
});

apiService.interceptors.request.use(function (config) {
  const token = localStorage.token;
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default apiService;
