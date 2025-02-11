import { create } from "zustand";

type User = {
    email: string;
    password: string;
};

type UserState = {
    currentUser: User | null;
    loginMessage: string | null;
    login: (user: User, message?: string | null) => void;
    logout: () => void;
    setLoginMessage: (message: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    loginMessage: null,
    login: (user, message = null) => set({ currentUser: user, loginMessage: message }),
    logout: () => set({ currentUser: null, loginMessage: null }),
    setLoginMessage: (message) => set({ loginMessage: message }),
}));
