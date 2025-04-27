// server/src/core/exceptions/database.error.ts
export class DatabaseError extends Error {
    public readonly code: string;
    public readonly details?: unknown;
  
    constructor(
      message: string,
      options?: {
        code?: string;
        details?: unknown;
        cause?: Error;
      }
    ) {
      super(message);
      this.name = 'DatabaseError';
      this.code = options?.code || 'DB_OPERATION_FAILED';
      this.details = options?.details;
      
      if (options?.cause) {
        this.cause = options.cause;
        this.stack = `${this.stack}\nCaused by: ${options.cause.stack}`;
      }
    }
  }