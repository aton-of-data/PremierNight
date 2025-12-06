import { logger } from '../logger';
import { LogLevel } from '../types';

const consoleDebug = jest.spyOn(console, 'debug').mockImplementation();
const consoleInfo = jest.spyOn(console, 'info').mockImplementation();
const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
const consoleError = jest.spyOn(console, 'error').mockImplementation();

describe('logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    logger.setLevel(LogLevel.DEBUG);
    logger.setConsoleEnabled(true);
  });

  describe('debug', () => {
    it('should log debug message', () => {
      logger.debug('Test debug message');

      expect(consoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG]'),
      );
      expect(consoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('Test debug message'),
      );
    });

    it('should log debug message with tags', () => {
      logger.debug('Test debug message', { tags: ['test', 'debug'] });

      expect(consoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('[test|debug]'),
      );
    });

    it('should log debug message with context', () => {
      logger.debug('Test debug message', {
        context: { userId: 123, action: 'test' },
      });

      expect(consoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('"userId":123'),
      );
      expect(consoleDebug).toHaveBeenCalledWith(
        expect.stringContaining('"action":"test"'),
      );
    });

    it('should not log when level is higher than DEBUG', () => {
      logger.setLevel(LogLevel.INFO);

      logger.debug('Test debug message');

      expect(consoleDebug).not.toHaveBeenCalled();
    });
  });

  describe('info', () => {
    it('should log info message', () => {
      logger.info('Test info message');

      expect(consoleInfo).toHaveBeenCalledWith(
        expect.stringContaining('[INFO]'),
      );
      expect(consoleInfo).toHaveBeenCalledWith(
        expect.stringContaining('Test info message'),
      );
    });

    it('should log info message with tags and context', () => {
      logger.info('Test info message', {
        tags: ['test'],
        context: { key: 'value' },
      });

      expect(consoleInfo).toHaveBeenCalledWith(
        expect.stringContaining('[test]'),
      );
      expect(consoleInfo).toHaveBeenCalledWith(
        expect.stringContaining('"key":"value"'),
      );
    });

    it('should not log when level is higher than INFO', () => {
      logger.setLevel(LogLevel.WARN);

      logger.info('Test info message');

      expect(consoleInfo).not.toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      logger.warn('Test warning message');

      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN]'),
      );
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Test warning message'),
      );
    });

    it('should log warning with tags and context', () => {
      logger.warn('Test warning', {
        tags: ['warning'],
        context: { issue: 'test' },
      });

      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('[warning]'),
      );
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('"issue":"test"'),
      );
    });

    it('should not log when level is higher than WARN', () => {
      logger.setLevel(LogLevel.ERROR);

      logger.warn('Test warning message');

      expect(consoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('error', () => {
    it('should log error message', () => {
      logger.error('Test error message');

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR]'),
      );
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('Test error message'),
      );
    });

    it('should log error with Error object', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('Error occurred'),
      );
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('"error_name":"Error"'),
      );
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('"error_message":"Test error"'),
      );
    });

    it('should log error with stack trace', () => {
      const error = new Error('Test error');
      error.stack = 'Error: Test error\n    at test.js:1:1';

      logger.error('Error occurred', error);

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('"error_stack"'),
      );
    });

    it('should handle non-Error objects', () => {
      logger.error('Error occurred', 'String error');

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('Error occurred'),
      );
    });

    it('should merge error context with options context', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error, {
        context: { customField: 'value' },
      });

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('"customField":"value"'),
      );
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining('"error_name"'),
      );
    });
  });

  describe('setLevel', () => {
    it('should set log level and filter messages', () => {
      logger.setLevel(LogLevel.WARN);

      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');

      expect(consoleDebug).not.toHaveBeenCalled();
      expect(consoleInfo).not.toHaveBeenCalled();
      expect(consoleWarn).toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalled();
    });

    it('should allow all logs at DEBUG level', () => {
      logger.setLevel(LogLevel.DEBUG);

      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');

      expect(consoleDebug).toHaveBeenCalled();
      expect(consoleInfo).toHaveBeenCalled();
      expect(consoleWarn).toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalled();
    });

    it('should only allow ERROR logs at ERROR level', () => {
      logger.setLevel(LogLevel.ERROR);

      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');

      expect(consoleDebug).not.toHaveBeenCalled();
      expect(consoleInfo).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalled();
    });
  });

  describe('setConsoleEnabled', () => {
    it('should disable console logging when set to false', () => {
      logger.setConsoleEnabled(false);

      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');

      expect(consoleDebug).not.toHaveBeenCalled();
      expect(consoleInfo).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
      expect(consoleError).not.toHaveBeenCalled();
    });

    it('should enable console logging when set to true', () => {
      logger.setConsoleEnabled(false);
      logger.setConsoleEnabled(true);

      logger.debug('Debug message');

      expect(consoleDebug).toHaveBeenCalled();
    });
  });

  describe('timestamp formatting', () => {
    it('should include timestamp in log messages', () => {
      logger.info('Test message');

      expect(consoleInfo).toHaveBeenCalledWith(
        expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
      );
    });
  });

  describe('empty tags and context', () => {
    it('should handle empty tags array', () => {
      logger.info('Test message', { tags: [] });

      expect(consoleInfo).toHaveBeenCalled();
      expect(consoleInfo).not.toHaveBeenCalledWith(
        expect.stringContaining('[]'),
      );
    });

    it('should handle empty context object', () => {
      logger.info('Test message', { context: {} });

      expect(consoleInfo).toHaveBeenCalled();
      // Should not include empty context in output
      expect(consoleInfo).not.toHaveBeenCalledWith(
        expect.stringContaining('" | {}'),
      );
    });
  });
});
