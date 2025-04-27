/**
 * Handles authentication flows (login, logout, token refresh) using JWT.
 * Integrates with Vue/Pinia stores and Axios interceptors.
 */
import apiClient from './api.client';
import { useAuthStore } from '../stores/auth.store';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    // other user fields
  };
}

export const AuthService = {
  async login(email: string, password: string): Promise<void> {
    try {
      const { data } = await apiClient.post<LoginResponse>('/auth/login', { email, password });
      const authStore = useAuthStore();
      
      // Use either setToken or setTokens depending on your needs
      authStore.setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      
      // Alternative if you only need to set access token:
      // authStore.setToken(data.accessToken);
      
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
    } catch (error: unknown) {
      let errorMessage = 'Login failed';
      
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage += ': ' + (axiosError.response?.data?.message || 'Unknown error');
      }
      
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<void> {
    const authStore = useAuthStore();
    authStore.clearToken();
    delete apiClient.defaults.headers.common['Authorization'];
  }
};