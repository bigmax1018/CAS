// shared/types/admin.ts
export interface AdminUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
  // Admin-specific fields
  isActive?: boolean;
  loginCount?: number;
}

  
  export type UserAction = 
    | 'activate' 
    | 'deactivate' 
    | 'promote' 
    | 'demote';