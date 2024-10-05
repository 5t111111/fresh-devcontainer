import type { MiddlewareFn } from "../../fresh/src/mod.ts";
import { Logger } from "./logger.ts";

/**
 * Custom State includes the logger instance associated with the current request.
 */
export interface SessionMiddlewareState {
  logger: Logger;
}

/**
 * Middleware for custom logging.
 *
 * @returns Middleware handler.
 */
export function logger<State extends SessionMiddlewareState>(): MiddlewareFn<
  State
> {
  /**
   * Middleware handler.
   *
   * @param req The incoming request object.
   * @param ctx The context object containing state and other information.
   * @returns The response object.
   */
  return async function handler(
    ctx,
  ): Promise<Response> {
    const logger = new Logger();

    logger.info("Request incoming");

    ctx.state.logger = logger;

    const resp = await ctx.next();

    logger.info("Request ended");

    return resp;
  };
}
