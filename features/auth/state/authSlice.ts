import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { create } from "zustand";

interface User {
    name: string;
    email: string;
    id: string;
}

interface AuthState {
    error?: string;
    isLoading?: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    registerUser: (name: string, email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: async (email: string, password: string) => {
        set({ isLoading: true });
        const signInResponse = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (signInResponse?.error) {
            set({ error: signInResponse.error, isLoading: false });
            return;
        }

        // Get session to retrieve user information including userId
        const session = await getSession();
        if (session && session.user) {
            set({
                user: { email, name: session.user.name, id: session.user.id },
                isLoading: false,
            });
        } else {
            set({ error: "No session found", isLoading: false });
        }
    },
    registerUser: async (name, email, password) => {
        set({ isLoading: true });
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            set({ error: errorData.error, isLoading: false });
            throw new Error(errorData.error || "Registration failed");
        }

        const signInResponse = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (signInResponse?.error) {
            set({ error: signInResponse.error, isLoading: false });
            return;
        }

        // Get session to retrieve user information including userId
        const session = await getSession();

        if (session && session.user) {
            set({
                user: { email, name: session.user.name, id: session.user.id },
                isLoading: false,
            });
        } else {
            set({ error: "No session found", isLoading: false });
        }
    },
    logoutUser: async () => {
        await signOut({ redirect: true });
        set({ user: null });
    },
}));
