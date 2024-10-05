import { createDefine } from "fresh";
import type { Session } from "fresh-session";
import type { Logger } from "fresh-logger";

export interface State {
  session: Session;
  logger: Logger;
}

export const define = createDefine<State>();
