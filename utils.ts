import { createDefine } from "fresh";
import type { Session } from "@5t111111/fresh-session";
import type { Logger } from "@5t111111/fresh-logger";

export interface State {
  session: Session;
  logger: Logger;
}

export const define = createDefine<State>();
