import { log, ulid } from "../deps.ts";

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
  info(msg: string) {
    this.logger.info(msg, { reqId: this.reqId });
  }
}
