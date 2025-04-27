// src/types/express.d.ts
import { User } from '../domains/users/user.model';

declare global {
  namespace Express {
    interface Request {
      __sentry_transaction?: Transaction;
      user?: {
        id: string;
      };
    }
  }
}