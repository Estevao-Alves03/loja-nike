import api from "./Api";

// Tipos para os dados de registro
export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }
  
  // Tipos para os dados de login
  export interface LoginData {
    email: string;
    password: string;
  }
  

// Registro
export const register = async (userData: RegisterData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

// Login
export const login = async (credentials: LoginData) => {
  const response = await api.post("/login", credentials);
  return response.data;
};
