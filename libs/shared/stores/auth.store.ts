import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  firstName: string;
  lastName: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    tokens: null,
  }),

  getters: {
    // Getter for the access token (used by api.client.ts)
    token: (state) => state.tokens?.accessToken,
    
    // Optional: Getter for refresh token
    refreshToken: (state) => state.tokens?.refreshToken,
    
    // Authentication status check
    isAuthenticated: (state) => !!state.tokens?.accessToken && !!state.user,
  },

  actions: {
    // Set both tokens
    setTokens(payload: Tokens) {
      this.tokens = payload;
    },

    // Set only access token
    setToken(token: string) {
      if (this.tokens) {
        this.tokens.accessToken = token;
      } else {
        this.tokens = { accessToken: token, refreshToken: '' };
      }
    },

    // Set user data
    setUser(user: User) {
      this.user = user;
    },

    // Clear all auth data
    clearTokens() {
      this.user = null;
      this.tokens = null;
    },

    // Alias for clearTokens
    clearToken() {
      this.clearTokens();
    },
  },
});