import type { MiddlewareFn } from "@fresh/core";
import { Logger } from "./logger.ts";

/**
 * Custom State includes the logger instance associated with the current request.
 */
export interface LoggerMiddlewareState {
  logger: Logger;
}

/**
 * Middleware for custom logging.
 *
 * @returns Middleware handler.
 */
export function logger<State extends LoggerMiddlewareState>(): MiddlewareFn<
  State
> {
  /**
   * Middleware handler.
   *
   * @param ctx The context object containing state and other information.
   * @returns The response object.
   */
  return async function handler(
    ctx,
  ): Promise<Response> {
    const logger = new Logger();

    const { req } = ctx;

    const requestDetails = {
      method: req.method,
      url: req.url,
      headers: req.headers,
    };

    console.log("requestDetails", requestDetails);

    logger.info("Request incoming", { req: requestDetails });

    ctx.state.logger = logger;

    const resp = await ctx.next();

    logger.info("Request ended");

    return resp;
  };
}
