import { create } from "zustand";

type User = {
    email: string,
    password: string,
}

type UserState = {
    currentUser: User | null,
    login: (user: User ) => void,
    logout: () => void
} 

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    login: (user) => set({ currentUser: user }),
    logout: () => set({currentUser: null})
  }));  