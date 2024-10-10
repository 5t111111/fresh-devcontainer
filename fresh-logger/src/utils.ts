import type { FreshContext } from "@fresh/core";
import { getLogger, type Logger as StdLogger, type LogRecord } from "@std/log";
import { Logger } from "./logger.ts";

/**
 * Retrieves the logger from the provided Fresh context or returns a default fresh logger.
 *
 * This function checks if the provided context (`ctx`) contains a state with a logger.
 * If a logger instance is found in the context state, it is returned. Otherwise,
 * a default fresh logger is returned.
 *
 * @param ctx The Fresh context which may contain a state with a logger.
 * @returns The logger instance from the context state or a default fresh logger.
 */
export function getFreshLogger<T extends { logger: Logger }>(
  ctx?: FreshContext<T> | undefined,
): Logger | StdLogger {
  if (
    ctx && ctx.state && ctx.state.logger && ctx.state.logger instanceof Logger
  ) {
    return ctx.state.logger;
  }

  return getLogger("fresh-logger");
}

/**
 * Extracts the request ID from a log record.
 *
 * @param logRecord The log record from which to extract the request ID.
 * @returns An object containing the extracted `reqId` (if any) and the remaining arguments. The `reqId` will be a string if found, otherwise `undefined`. The `args` will be an array of the remaining arguments excluding the object that contained the `reqId`.
 */
export function extractReqId(logRecord: LogRecord): {
  reqId: string | undefined;
  args: unknown[];
} {
  let reqId: string | undefined;
  const argsWithoutReqId = [];

  for (const arg of logRecord.args) {
    if (arg && typeof arg === "object") {
      const objectArg = arg as Record<string, unknown>;

      if (objectArg.reqId) {
        reqId = objectArg.reqId as string;
      } else {
        argsWithoutReqId.push(arg);
      }
    } else {
      argsWithoutReqId.push(arg);
    }
  }

  return {
    reqId,
    args: argsWithoutReqId,
  };
}
