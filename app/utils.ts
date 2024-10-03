import { createDefine } from "fresh/src/mod.ts";

// deno-lint-ignore no-empty-interface
export interface State {}

export const define = createDefine<State>();
