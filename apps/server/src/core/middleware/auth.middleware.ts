// server/src/core/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api.error'

/**
 * JWT Authentication middleware with role validation
 */
export const authMiddleware = (requiredRoles: string[] = []) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) throw new ApiError(401, 'Authentication required')

      // Verify token logic here
      const user = { id: 'mock', roles: ['user'] } // Replace with actual verification

      // Role validation
      if (requiredRoles.length > 0 && 
          !requiredRoles.some(role => user.roles.includes(role))) {
        throw new ApiError(403, 'Insufficient permissions')
      }

      req.user = user
      next()
    } catch (error) {
      next(new ApiError(401, 'Invalid authentication token'))
    }
  }
}