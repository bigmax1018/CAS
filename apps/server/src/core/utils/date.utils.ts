// server/src/core/utils/date.utils.ts
/**
 * Date handling utilities with timezone support and format validation.
 * Uses date-fns-tz for timezone operations and custom formatters.
 */
import { format, parseISO, isValid } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { ValidationError } from '../exceptions';

const DEFAULT_TIMEZONE = 'UTC';
const API_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";

export const DateUtils = {
  // Timezone Conversion
  toUTC(date: Date | string, timezone: string = DEFAULT_TIMEZONE): Date {
    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) {
        throw new ValidationError(`Invalid date: ${date}`);
      }
      return zonedTimeToUtc(parsedDate, timezone);
    } catch (err) {
      throw new DateError('Timezone conversion failed', err);
    }
  },

  toLocal(date: Date | string, timezone: string): Date {
    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(parsedDate)) {
        throw new ValidationError(`Invalid date: ${date}`);
      }
      return utcToZonedTime(parsedDate, timezone);
    } catch (err) {
      throw new DateError('Local time conversion failed', err);
    }
  },

  // Formatting
  formatForAPI(date: Date): string {
    return format(date, API_FORMAT);
  },

  formatHumanReadable(date: Date, timezone?: string): string {
    const targetDate = timezone ? this.toLocal(date, timezone) : date;
    return format(targetDate, 'PPpp');
  },

  // Validation
  isValidDate(date: unknown): date is Date | string {
    if (date instanceof Date) return isValid(date);
    if (typeof date === 'string') return isValid(parseISO(date));
    return false;
  },
};

class DateError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = 'DateError';
  }
}