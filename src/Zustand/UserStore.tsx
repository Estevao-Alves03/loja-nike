import { create } from "zustand";

interface User {
    id: number;
    email: string;
    password: string;
    authToken?: string; // 🔹 Adiciona o token no usuário
    address?: {
      name_street: string;
      neighborhood: string;
      complement: string;
    };
  }
  
  type UserState = {
    currentUser: User | null;
    loginMessage: string | null;
    login: (user: User, token: string, message?: string | null) => void;
    logout: () => void;
    setLoginMessage: (message: string | null) => void;
  };
  
  const getStoredUser = (): User | null => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };
  
  export const useUserStore = create<UserState>((set) => ({
    currentUser: getStoredUser(),
    loginMessage: null,
  
    login: (user, token, message = null) => {
      user.authToken = token; // 🔹 Adiciona o token ao usuário
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", token); // 🔹 Salva o token
      set({ currentUser: user, loginMessage: message });
    },
  
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      set({ currentUser: null, loginMessage: null });
    },
  
    setLoginMessage: (message) => set({ loginMessage: message }),
  }));
  