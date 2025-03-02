import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002",
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use((config) => {
  // Verifica se a requisição é para login ou registro
  if (config.url?.includes("/login") || config.url?.includes("/register")) {
    return config; // Se for login ou registro, não adiciona o token
  }

  // Pega o token salvo no localStorage
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
