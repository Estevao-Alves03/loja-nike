import { create } from "zustand";

interface User {
    id: number;
    email: string;
    password: string;
    address?: {
      name_street: string;
      neighborhood: string;
      complement: string;
    };
}

type UserState = {
    currentUser: User | null;
    loginMessage: string | null;
    login: (user: User, message?: string | null) => void;
    logout: () => void;
    setLoginMessage: (message: string | null) => void;
};

// Função para carregar o usuário do localStorage
const getStoredUser = (): User | null => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
};

export const useUserStore = create<UserState>((set) => ({
    currentUser: getStoredUser(), // 🔹 Carrega do localStorage ao iniciar
    loginMessage: null,

    login: (user, message = null) => {
        localStorage.setItem("user", JSON.stringify(user)); // 🔹 Salva no localStorage
        set({ currentUser: user, loginMessage: message });
    },

    logout: () => {
        localStorage.removeItem("user"); // 🔹 Remove do localStorage ao deslogar
        set({ currentUser: null, loginMessage: null });
    },

    setLoginMessage: (message) => set({ loginMessage: message }),
}));
