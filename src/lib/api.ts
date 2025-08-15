// src/lib/api.ts
"use client";

import Cookies from "js-cookie";

export type ApiError = {
  message: string;
  error?: string;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  // Keep console error; no eslint-disable needed when your config allows console in dev.
  console.error(
    "NEXT_PUBLIC_API_URL is not set. Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:4000"
  );
}

// Helper to safely parse JSON error body
async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as Partial<ApiError>;
    return data.message || data.error || `API error: ${res.status}`;
  } catch {
    return `API error: ${res.status}`;
  }
}

export async function apiRequest<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Please add it to .env.local and restart the dev server."
    );
  }

  const token = Cookies.get("auth-token");

  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    baseHeaders.Authorization = `Bearer ${token}`;
  }

  const mergedHeaders: HeadersInit =
    init.headers instanceof Headers
      ? (() => {
          const h = new Headers(init.headers);
          Object.entries(baseHeaders).forEach(([k, v]) => {
            if (!h.has(k)) h.set(k, v);
          });
          return h;
        })()
      : { ...baseHeaders, ...(init.headers as Record<string, string> | undefined) };

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: mergedHeaders,
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    const msg = await readErrorMessage(res);
    throw new Error(msg);
  }

  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    Cookies.set("auth-token", response.token, { expires: 7 });
    return response;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    Cookies.set("auth-token", response.token, { expires: 7 });
    return response;
  },

  logout: (): void => {
    Cookies.remove("auth-token");
  },

  getCurrentUser: async (): Promise<User> => {
    return apiRequest<User>("/api/auth/me");
  },

  isAuthenticated: (): boolean => {
    return Boolean(Cookies.get("auth-token"));
  },
};
