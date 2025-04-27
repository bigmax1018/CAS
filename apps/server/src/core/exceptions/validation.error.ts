// server/src/core/exceptions/validation.error.ts
/**
 * Custom validation error class extending ApiError
 * Includes detailed field validation errors
 */
import { ApiError } from './api.error';
export class ValidationError extends ApiError {
    public fields: Record<string, string>;
    
    constructor(message: string, fields: Record<string, string>) {
      super(400, 'VALIDATION_ERROR', { message });
      this.fields = fields;
    }
    
    toJSON() {
      return {
        ...super.toJSON(),
        fields: this.fields
      };
    }
  }