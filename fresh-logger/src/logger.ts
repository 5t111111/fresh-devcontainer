import { log, ulid } from "../deps.ts";

/**
 * Logger class that provides methods for logging messages with different severity levels.
 * Each log message is appended with a unique request ID (`reqId`).
 */
export class Logger {
  /**
   * The unique request ID associated with this logger instance.
   */
  private readonly reqId: string;

  /**
   * The underlying logger instance from the @std/log.
   */
  private readonly logger: log.Logger;

  /**
   * Constructs a new Logger instance.
   * Generates a unique request ID (`reqId`) and initializes the logger with the name "fresh-logger".
   */
  constructor() {
    this.reqId = ulid();
    this.logger = log.getLogger("fresh-logger");
  }

  /**
   * Logs a debug message.
   *
   * @param msg - The message to log. Can be a string or a function that returns a string.
   * @param args - Additional arguments to log.
   * @returns The logged message if `msg` is a function, otherwise `undefined`.
   */
  debug<T>(
    msg: (T extends log.GenericFunction ? never : T) | (() => T),
    ...args: unknown[]
  ): T | undefined {
    args.push({ reqId: this.reqId });

    // To avoid odd type errors, we need to check if msg is a function
    if (msg instanceof Function) {
      return this.logger.debug(msg, ...args);
    } else {
      return this.logger.debug(msg, ...args);
    }
  }

  /**
   * Logs an info message.
   *
   * @param msg - The message to log. Can be a string or a function that returns a string.
   * @param args - Additional arguments to log.
   * @returns The logged message if `msg` is a function, otherwise `undefined`.
   */
  info<T>(
    msg: (T extends log.GenericFunction ? never : T) | (() => T),
    ...args: unknown[]
  ): T | undefined {
    args.push({ reqId: this.reqId });

    // To avoid odd type errors, we need to check if msg is a function
    if (msg instanceof Function) {
      return this.logger.info(msg, ...args);
    } else {
      return this.logger.info(msg, ...args);
    }
  }

  /**
   * Logs a warning message.
   *
   * @param msg - The message to log. Can be a string or a function that returns a string.
   * @param args - Additional arguments to log.
   * @returns The logged message if `msg` is a function, otherwise `undefined`.
   */
  warn<T>(
    msg: (T extends log.GenericFunction ? never : T) | (() => T),
    ...args: unknown[]
  ): T | undefined {
    args.push({ reqId: this.reqId });

    // To avoid odd type errors, we need to check if msg is a function
    if (msg instanceof Function) {
      return this.logger.warn(msg, ...args);
    } else {
      return this.logger.warn(msg, ...args);
    }
  }

  /**
   * Logs an error message.
   *
   * @param msg - The message to log. Can be a string or a function that returns a string.
   * @param args - Additional arguments to log.
   * @returns The logged message if `msg` is a function, otherwise `undefined`.
   */
  error<T>(
    msg: (T extends log.GenericFunction ? never : T) | (() => T),
    ...args: unknown[]
  ): T | undefined {
    args.push({ reqId: this.reqId });

    // To avoid odd type errors, we need to check if msg is a function
    if (msg instanceof Function) {
      return this.logger.error(msg, ...args);
    } else {
      return this.logger.error(msg, ...args);
    }
  }

  /**
   * Logs an error message.
   *
   * @param msg - The message to log. Can be a string or a function that returns a string.
   * @param args - Additional arguments to log.
   * @returns The logged message if `msg` is a function, otherwise `undefined`.
   */
  critical<T>(
    msg: (T extends log.GenericFunction ? never : T) | (() => T),
    ...args: unknown[]
  ): T | undefined {
    args.push({ reqId: this.reqId });

    // To avoid odd type errors, we need to check if msg is a function
    if (msg instanceof Function) {
      return this.logger.critical(msg, ...args);
    } else {
      return this.logger.critical(msg, ...args);
    }
  }
}
