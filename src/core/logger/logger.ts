import { LogLevel, type LogContext, type LoggerOptions } from './types';

/**
 * Logger configuration
 */
interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableTimestamp: boolean;
}

const config: LoggerConfig = {
  level: __DEV__ ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: true,
  enableTimestamp: true,
};

/**
 * Format log message
 */
const formatMessage = (
  level: string,
  message: string,
  tags?: string[],
  context?: LogContext,
): string => {
  const timestamp = config.enableTimestamp ? new Date().toISOString() : '';

  const tagsStr = tags && tags.length > 0 ? `[${tags.join('|')}]` : '';

  const contextStr =
    context && Object.keys(context).length > 0
      ? ` | ${JSON.stringify(context)}`
      : '';

  const parts = [timestamp, `[${level}]`, tagsStr, message, contextStr].filter(
    Boolean,
  );

  return parts.join(' ');
};

/**
 * Check if log level should be logged
 */
const shouldLog = (level: LogLevel): boolean => {
  return level >= config.level;
};

/**
 * Log function
 */
const log = (
  level: LogLevel,
  levelName: string,
  message: string,
  options?: LoggerOptions,
): void => {
  if (!shouldLog(level) || !config.enableConsole) {
    return;
  }

  const formatted = formatMessage(
    levelName,
    message,
    options?.tags,
    options?.context,
  );

  switch (level) {
    case LogLevel.DEBUG:
      console.debug(formatted);
      break;
    case LogLevel.INFO:
      console.info(formatted);
      break;
    case LogLevel.WARN:
      console.warn(formatted);
      break;
    case LogLevel.ERROR:
      console.error(formatted);
      break;
  }
};

/**
 * Logger API
 */
export const logger = {
  /**
   * Debug log
   */
  debug: (message: string, options?: LoggerOptions): void => {
    log(LogLevel.DEBUG, 'DEBUG', message, options);
  },

  /**
   * Info log
   */
  info: (message: string, options?: LoggerOptions): void => {
    log(LogLevel.INFO, 'INFO', message, options);
  },

  /**
   * Warning log
   */
  warn: (message: string, options?: LoggerOptions): void => {
    log(LogLevel.WARN, 'WARN', message, options);
  },

  /**
   * Error log
   */
  error: (
    message: string,
    error?: Error | unknown,
    options?: LoggerOptions,
  ): void => {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    const errorContext: LogContext = {
      ...options?.context,
      error_name: errorObj.name,
      error_message: errorObj.message,
      ...(errorObj.stack && { error_stack: errorObj.stack }),
    };

    log(LogLevel.ERROR, 'ERROR', message, {
      ...options,
      context: errorContext,
    });
  },

  /**
   * Set log level
   */
  setLevel: (level: LogLevel): void => {
    config.level = level;
  },

  /**
   * Enable/disable console logging
   */
  setConsoleEnabled: (enabled: boolean): void => {
    config.enableConsole = enabled;
  },
};
