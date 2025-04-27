// server/src/domains/users/user.controller.ts
/**
 * User controller handling HTTP requests/responses
 * Validates inputs and handles errors appropriately
 */
import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';
import { ValidationError } from '../../core/exceptions';


export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new ValidationError('Invalid user ID', { userId: 'missing' });
      
      const user = await this.userService.getProfile(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new ValidationError('Invalid user ID', { userId: 'missing' });
      
      const updatedUser = await this.userService.updateProfile(
        userId, 
        req.body
      );
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
}