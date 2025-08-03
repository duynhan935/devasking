// stores/useUserStore.ts
import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin"; 
  isActive: boolean;
  isEmailVerified: boolean;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
