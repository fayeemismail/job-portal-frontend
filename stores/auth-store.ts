import { create } from 'zustand';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  isHydrating: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrating: true,
  setUser: (user) => set({ user, isHydrating: false }),
  clearUser: () => set({ user: null, isHydrating: false }),
}));
