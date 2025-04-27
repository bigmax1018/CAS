// server/src/infrastructure/database/postgres.client.ts
import { Pool } from 'pg'
import { ApiError } from '../../core/exceptions/api.error'
import { PrismaClient } from '@prisma/client';
/**
 * PostgreSQL client with connection pooling and error handling
 */
class PostgresClient {
  private pool: Pool

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000
    })

    this.pool.on('error', (err) => {
      console.error('PostgreSQL pool error:', err)
      throw new ApiError(500, 'Database connection error')
    })
  }

  /**
   * Execute query with parameters and error handling
   */
  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    try {
      const result = await this.pool.query(text, params)
      return result.rows
    } catch (error) {
      throw new ApiError(500, 'Database query failed', { originalError: error })
    }
  }
}
const db = new PrismaClient();
export default db;
export const postgres = new PostgresClient()