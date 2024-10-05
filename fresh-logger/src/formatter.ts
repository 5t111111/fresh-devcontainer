import type { log } from "../deps.ts";
import { extractReqId } from "./utils.ts";

/**
 * Formats a log record into a JSON string with a reqId.
 *
 * @param logRecord The log record to format.
 * @returns A JSON string representing the formatted log record.
 */
export function freshLoggerJsonFormatter(logRecord: log.LogRecord): string {
  const { reqId, args } = extractReqId(logRecord);

  return JSON.stringify({
    level: logRecord.levelName,
    datetime: logRecord.datetime.getTime(),
    message: logRecord.msg,
    reqId,
    args: flattenArgs(args),
  });
}

function flattenArgs(args: unknown[]): unknown {
  if (args.length === 1) {
    return args[0];
  } else if (args.length > 1) {
    return args;
  }
}
