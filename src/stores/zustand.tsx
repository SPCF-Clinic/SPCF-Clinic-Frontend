import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  role?: "admin" | "superadmin" | "student";

  login: (role: "admin" | "superadmin" | "student") => void;
  logout: () => void;
//   setUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (role) => set({
    role: role,
    isAuthenticated: true
  }),
  logout: () => set({
    isAuthenticated: false
  }),
//   setUser: () => set({
//     isAuthenticated: !!user
//   }),
}));

export default useAuthStore;
