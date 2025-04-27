// shared/types/user.ts
/**
 * User/auth related types
 */
// types/user.ts
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export interface ProfileUpdate {
  firstName?: string;
  lastName?: string;
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}
// shared/types/user.ts
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  firstName: string;
  lastName: string;
  // User-specific fields
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}
export interface UserPreferences {
    defaultNetwork?: string;
    favoritePairs?: string[];
    theme: 'light' | 'dark';
}
  
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}