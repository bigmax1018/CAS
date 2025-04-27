// server/src/core/utils/nestjs-logger.adapter.ts
import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from './logger';  // Your Winston logger

@Injectable()
export class NestjsLoggerAdapter implements LoggerService {
  log(message: string, context?: string) {
    logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    logger.error(message, { stack: trace, context });
  }

  warn(message: string, context?: string) {
    logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    logger.debug(message, { context });
  }
}