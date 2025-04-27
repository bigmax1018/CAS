// shared/services/api/api.ts
/**
 * API service layer - contains all API endpoint definitions
 * Organized by domain (auth, market, user etc.)
 */
import { ApiClient } from './api.client';
import * as Types from '../../types'; // Now properly typed

const api = new ApiClient();

// Auth API Domain
export const AuthApi = {
  login: (email: string, password: string): Promise<Types.AuthResponse> => 
    api.post('/auth/login', { email, password }),

  refreshToken: (refreshToken: string): Promise<Types.AuthResponse> =>
    api.post('/auth/refresh', { refreshToken }),

  logout: (): Promise<void> => api.post('/auth/logout', {})
};

// Market API Domain
export const MarketApi = {
  getNetworks: (): Promise<Types.Network[]> => 
    api.get('/market/networks'),

  getTokenPairs: (networkId: string): Promise<Types.TokenPair[]> =>
    api.get(`/market/pairs?network=${networkId}`),

  getPriceHistory: (pairId: string, timeframe: string): Promise<Types.PriceTick[]> =>
    api.get(`/market/history/${pairId}?timeframe=${timeframe}`),

  getPredictions: (request: Types.PredictionRequest): Promise<Types.PredictionResult> =>
    api.post('/market/predict', request)
};

// NEW: User API Domain
export const UserApi = {
  getProfile: (): Promise<Types.UserProfile> =>
    api.get('/user/profile'),

  updateProfile: (data: Types.ProfileUpdate): Promise<Types.UserProfile> =>
    api.put('/user/profile', data),

  changePassword: (data: Types.PasswordChange): Promise<void> =>
    api.post('/user/change-password', data)
};

// NEW: Admin API Domain (if needed)
export const AdminApi = {
  getAllUsers: (): Promise<Types.User[]> =>
    api.get('/admin/users'),

  manageUser: (userId: string, action: Types.UserAction): Promise<void> =>
    api.post(`/admin/users/${userId}`, { action })
};