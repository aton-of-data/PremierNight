/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * Context information for logs
 */
export interface LogContext {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Logger options
 */
export interface LoggerOptions {
  tags?: string[];
  context?: LogContext;
}
