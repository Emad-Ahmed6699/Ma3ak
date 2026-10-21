"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "ma3ak-auth",
    }
  )
);
