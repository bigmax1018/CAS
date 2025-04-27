/**
 * Merged Axios instances (previously separate for auth/market) into a single client
 * with standardized error handling and JWT injection.
 */
import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token; // Using the token getter
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    
    if (error.response?.status === 401) {
      // Clear auth data and redirect
      authStore.clearTokens(); // Using the proper method name
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;