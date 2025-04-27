// server/src/core/exceptions/api.error.ts
/**
 * Base API error class with status code and metadata
 * @extends Error
 */

export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: Record<string, unknown>;

  constructor(statusCode: number, code: string, details?: Record<string, unknown>) {
    // Ensure message is always a string
    const message = details?.message && typeof details.message === 'string' 
      ? details.message 
      : 'An error occurred';

    super(message);  // Pass message to the Error constructor
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);  // Ensures `instanceof ApiError` works correctly.
  }

  // Define toJSON method to serialize the error
  toJSON() {
    return {
      statusCode: this.statusCode,
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}
  
  /**
   * Specific error for market data failures
   */
  export class MarketDataError extends ApiError {
    constructor(message: string, public pair?: string) {
      super(503, `Market data error: ${message}`)
    }
  }

  export class TooManyRequestsError extends ApiError {
    constructor(public retryAfter: number) {
      // Pass the retryAfter message as part of an object to the ApiError constructor
      super(429, 'RATE_LIMIT_EXCEEDED', { message: `Retry after ${retryAfter} seconds.` });
    }
  
    toJSON() {
      return { ...super.toJSON(), retryAfter: this.retryAfter };
    }
  }