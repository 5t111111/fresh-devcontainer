import { createDefine } from "fresh/src/mod.ts";
import type { Session } from "fresh-session";

export interface State {
  session: Session;
}

export const define = createDefine<State>();
