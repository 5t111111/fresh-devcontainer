import { useSignal } from "@preact/signals";
import { define } from "../utils.ts";
import Counter from "../islands/Counter.tsx";
import { HttpError, page } from "fresh";
import * as log from "@std/log";

export const handler = define.handlers({
  GET: (ctx) => {
    // Test session
    const session = ctx.state.session;
    console.log("session.foo - before set:", session.get("foo"));
    session.set("foo", { bar: "baz" });
    console.log("session.foo - after set:", session.get("foo"));

    // Test logger
    const logger = ctx.state.logger;
    // console.log("logger", logger);
    logger.info(
      "This is an info message",
      "yapya!",
      [1, 2, 3],
      null,
      undefined,
      {},
    );
    log.info("NORMAL: This is an info message");

    return page();
  },
});

export default define.page(function Home() {
  const count = useSignal(3);

  // throw new HttpError(500, "This is an error message");

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
