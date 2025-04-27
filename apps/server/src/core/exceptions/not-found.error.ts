// src/core/exceptions/not-found.error.ts
export class NotFoundError extends Error {
  constructor(
    message: string,
    public resource?: string,
    public id?: string
  ) {
    super(message);
    this.name = 'NotFoundError';
    
    // Maintains proper stack trace (only needed if you're extending built-ins)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}