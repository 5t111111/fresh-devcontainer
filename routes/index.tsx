import { useSignal } from "@preact/signals";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import { page } from "fresh";
import * as log from "@std/log";
import { getFreshLogger } from "@5t111111/fresh-logger";

export const handler = define.handlers({
  GET: (ctx) => {
    // Test session
    const session = ctx.state.session;
    console.log("session.foo - before set:", session.get<string>("foo"));
    session.set("foo", { bar: "baz" });
    console.log("session.foo - after set:", session.get<string>("foo"));

    // Test logger
    const freshLogger = getFreshLogger(ctx);
    // console.log("logger", logger);
    freshLogger.info(
      "This is an info message",
      "yapya!",
      [1, 2, 3],
      null,
      undefined,
      {},
    );

    const freshLoggerWithNoCtx = getFreshLogger();
    // console.log("logger", logger);
    freshLoggerWithNoCtx.info(
      "This is an info message",
      "yapya!",
      [1, 2, 3],
      null,
      undefined,
      {},
    );

    const freshLogger2 = getFreshLogger(ctx);
    // console.log("logger", logger);
    freshLogger.info(
      "This is an info message 2",
      "yapya!",
      [1, 2, 3],
      null,
      undefined,
      {},
    );

    log.info(
      // "NORMAL: This is an info message",
      "NORMAL: This is an info message",
      "yapya!",
      [1, 2, 3],
      null,
      undefined,
      {},
    );

    return page();
  },
});

export default define.page(function Home() {
  const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
});
