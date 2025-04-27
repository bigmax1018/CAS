// api/index.ts
import { ApiClient } from './api.client';
import * as Types from '@shared/types';

const api = new ApiClient();

export const AuthApi = {
  login: (credentials: Types.LoginCredentials) => 
    api.post<Types.AuthResponse>('/auth/login', credentials),
    
  refreshToken: (token: Types.RefreshTokenRequest) =>
    api.post<Types.AuthResponse>('/auth/refresh', token),
    
  logout: () => api.post<void>('/auth/logout', {})
};

export const MarketApi = {
  getNetworks: () => api.get<Types.Network[]>('/market/networks'),
  getTokenPairs: (networkId: string) => 
    api.get<Types.TokenPair[]>(`/market/pairs?network=${networkId}`),
  getPriceHistory: (pairId: string, timeframe: string) =>
    api.get<Types.PriceTick[]>(`/market/history/${pairId}?timeframe=${timeframe}`),
  getPredictions: (request: Types.PredictionRequest) =>
    api.post<Types.PredictionResult>('/market/predict', request)
};

export const UserApi = {
  getProfile: () => api.get<Types.UserProfile>('/user/profile'),
  updateProfile: (data: Types.ProfileUpdate) =>
    api.put<Types.UserProfile>('/user/profile', data),
  changePassword: (data: Types.PasswordChange) =>
    api.post<void>('/user/change-password', data)
};

export const AdminApi = {
  getAllUsers: () => api.get<Types.User[]>('/admin/users'),
  manageUser: (userId: string, action: Types.UserAction) =>
    api.post<void>(`/admin/users/${userId}`, { action })
};