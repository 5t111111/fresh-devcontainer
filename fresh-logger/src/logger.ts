import { log, ulid } from "../deps.ts";

type MsgType<T> = T extends log.GenericFunction ? never : T | (() => T);

export class Logger {
  private readonly reqId: string;
  private readonly logger: log.Logger;

  constructor() {
    this.reqId = ulid();
    this.logger = log.getLogger("fresh-logger");
  }

  // info<T>(
  //   msg: T extends GenericFunction ? never : T,
  // ) {
  //   // this.logger.info(msg, { reqId: this.reqId });
  //   this.logger.info("yeah!");
  // }
  // info(msg: string) {
  //   this.logger.info(msg, { reqId: this.reqId });
  // }

  // function info(msg: ???) {
  //   const logger = new Logger()
  //   logger.info(msg, { reqId: 1234 });
  // }
  // info<T>(msg: T extends log.GenericFunction ? never : T | (() => T)) {
  //   this.logger.info(msg, { reqId: 1234 });
  // }

  // info<T>(msg: T extends log.GenericFunction ? never : T) {
  //   this.logger.info(msg, { reqId: 1234 });
  // }

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
  // info<T>(msg: () => T): any {
  //   this.logger.info(msg, { reqId: 1234 });
  // }
}

// function info<T>(msg: T | (() => T)): void {
//   const logger = log.getLogger();
//   if (typeof msg === "function") {
//     // 関数の場合
//     logger.info(msg as () => T, { reqId: 1234 });
//   } else {
//     // 値の場合
//     logger.info(msg, { reqId: 1234 });
//   }
// }

// function info(msg: string | (() => unknown)): void {
//   const logger = log.getLogger();
//   if (typeof msg === "function") {
//     logger.info(msg, { reqId: 1234 });
//   } else {
//     logger.info(msg, { reqId: 1234 });
//   }
// }
// function info<T>(
//   msg: T extends log.GenericFunction ? never : T | (() => T),
// ): void {
//   const logger = log.getLogger();
//   if (typeof msg === "function") {
//     logger.info(msg as () => T, { reqId: 1234 });
//   } else {
//     logger.info(msg, { reqId: 1234 });
//   }
// }
