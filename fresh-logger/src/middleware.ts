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
    console.log("logger middleware");
    ctx.state.logger = new Logger();

    const resp = await ctx.next();

    return resp;
  };
}
