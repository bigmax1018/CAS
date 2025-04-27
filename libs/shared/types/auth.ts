// types/auth.ts
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RefreshTokenRequest {
    refreshToken: string;
  }
  
  export interface LogoutRequest {
    sessionId?: string;
  }