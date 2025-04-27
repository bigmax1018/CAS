// api/types/responses.ts
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    timestamp: string;
  }
  
  export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
  }