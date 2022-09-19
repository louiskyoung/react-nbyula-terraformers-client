import axios from 'axios';

axios.defaults.baseURL =
  `${process.env.SERVER_URL}/api` || 'https://localhost:8000/api';
axios.interceptors.request.use(function (config) {
  const token = localStorage.token;
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default axios;
