import { log, ulid } from "../deps.ts";

export class Logger {
  private readonly reqId: string;
  private readonly logger: log.Logger;

  constructor() {
    this.reqId = ulid();
    this.logger = log.getLogger("fresh-logger");
  }

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
