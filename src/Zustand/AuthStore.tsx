import { create } from "zustand";

// Função para carregar o estado salvo no localStorage
const getStoredAuthState = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? { isAuthenticated: true, user: JSON.parse(storedUser) } : { isAuthenticated: false, user: null };
};

type AuthState = {
  isAuthenticated: boolean;
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getStoredAuthState(), // 🔹 Carrega o estado salvo no localStorage

  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // 🔹 Salva no localStorage
    set({ isAuthenticated: true, user });
  },

  logout: () => {
    localStorage.removeItem("user"); // 🔹 Remove do localStorage ao deslogar
    localStorage.removeItem("authToken"); // 🔹 Remove o token também
    set({ isAuthenticated: false, user: null });
  }
}));
