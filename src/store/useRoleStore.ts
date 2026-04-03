import { create } from "zustand";

type Role = "student" | "admin" | null;

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
  logout: () => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  logout: () => set({ role: null }),
}));
