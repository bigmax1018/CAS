// server/src/domains/users/user.repository.ts
import { User } from './user.schema';
import { hashPassword } from '../../../../shared/utils/auth.utils';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.schema';
import { DatabaseError } from '../../core/exceptions/database.error';
import { logger } from '../../core/utils/logger';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email: userData.email,
          password_hash: await hashPassword(userData.password),
          name: userData.name,
        },
      });
    } catch (error) {
      logger.error('Failed to create user', {
        error,
        email: userData.email,
        operation: 'create'
      });
      throw new DatabaseError('Failed to create user', {
        cause: error instanceof Error ? error : undefined
      });
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      logger.error('Failed to find user by ID', {
        error,
        userId: id,
        operation: 'findById'
      });
      throw new DatabaseError('Failed to find user by ID', {
        cause: error instanceof Error ? error : undefined
      });
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      logger.error('Failed to find user by email', {
        error,
        email,
        operation: 'findByEmail'
      });
      throw new DatabaseError('Failed to find user by email', {
        cause: error instanceof Error ? error : undefined
      });
    }
  }

  async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'password_hash'>>,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      logger.error('Failed to update user', {
        error,
        userId: id,
        operation: 'update'
      });
      throw new DatabaseError('Failed to update user', {
        cause: error instanceof Error ? error : undefined
      });
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      logger.error('Failed to delete user', {
        error,
        userId: id,
        operation: 'delete'
      });
      throw new DatabaseError('Failed to delete user', {
        cause: error instanceof Error ? error : undefined
      });
    }
  }
}