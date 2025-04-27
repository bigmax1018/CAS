// server/src/core/utils/response.utils.ts
/**
 * Standardizes API response formats with proper typing and error wrapping.
 */
import { Response } from 'express';
import { ApiError } from '../exceptions';

type SuccessResponse<T> = {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: unknown;
  };
};

type ErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export const ResponseUtils = {
  success<T>(res: Response, data: T, meta?: SuccessResponse<T>['meta']): void {
    const response: SuccessResponse<T> = { data };
    if (meta) response.meta = meta;
    res.status(200).json(response);
  },

  created<T>(res: Response, data: T): void {
    res.status(201).json({ data });
  },

  error(res: Response, error: ApiError | Error): void {
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const response: ErrorResponse = {
      error: {
        code: error instanceof ApiError ? error.code : 'INTERNAL_ERROR',
        message: error.message,
        ...(error instanceof ApiError && error.details && { details: error.details }),
      },
    };
    res.status(statusCode).json(response);
  },

  paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number
  ): void {
    this.success(res, data, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  },
};