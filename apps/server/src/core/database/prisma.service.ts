// server/src/core/database/prisma.service.ts
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$connect(); // Ensuring Prisma is connected
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Gracefully disconnect when module is destroyed
  }
}