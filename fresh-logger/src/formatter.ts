import type { log } from "../deps.ts";

export function freshLoggerJsonFormatter(logRecord: log.LogRecord): string {
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

  return JSON.stringify({
    level: logRecord.levelName,
    datetime: logRecord.datetime.getTime(),
    message: logRecord.msg,
    reqId,
    args: flattenArgs(argsWithoutReqId),
  });
}

function flattenArgs(args: unknown[]): unknown {
  if (args.length === 1) {
    return args[0];
  } else if (args.length > 1) {
    return args;
  }
}
