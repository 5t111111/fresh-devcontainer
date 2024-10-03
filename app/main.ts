import { App, fsRoutes, staticFiles } from "fresh/src/mod.ts";
import { define, type State } from "./utils.ts";
import { session } from "fresh-session/src/middleware.ts";

export const app = new App<State>();
app.use(staticFiles());

app.use(session({
  // Key must be at least 32 characters long.
  encryptionKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  // Optional; the session does not expire if not provided.
  expireAfterSeconds: 5,
  // Optional; default is "session".
  sessionCookieName: "my_session",
  // Optional; see https://jsr.io/@std/http/doc/cookie/~/Cookie
  cookieOptions: { path: "/", secure: true, sameSite: "Lax" },
}));

// this is the same as the /api/:name route defined via a file. feel free to delete this!
app.get("/api2/:name", (ctx) => {
  const name = ctx.params.name;
  return new Response(
    `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}`,
  );
});

// this can also be defined via a file. feel free to delete this!
const exampleLoggerMiddleware = define.middleware((ctx) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return ctx.next();
});
app.use(exampleLoggerMiddleware);

await fsRoutes(app, {
  dir: "./",
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
