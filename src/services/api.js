import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const apiViaCep = axios.create({
  baseURL: 'http://viacep.com.br/ws/',
});

export default api;
