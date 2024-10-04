import { createDefine } from "fresh";
import type { Session } from "fresh-session";

export interface State {
  session: Session;
}

export const define = createDefine<State>();
