import { type JsonCompatible, Session } from "@5t111111/fresh-session";
import { define } from "../utils.ts";

interface State {
  session: Session;
}

// interface User {
//   id: number;
//   name: string;
// }

export const handler = define.handlers({
  async POST(ctx) {
    const form = await ctx.req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    // Check if the user exists in the database and the password is correct...
    // Let's assume that the type of the user data is { id: number; name: string; }.
    // const user = await authenticate(email, password);
    const user = { id: 1993, name: "Deno" };

    // Set the user ID in the session.
    const session = ctx.state.session;
    session.set("isAuthenticated", true);
    session.set("userId", user.id);

    // Redirect user to profile page.
    return new Response(null, {
      status: 302,
      headers: { Location: "/profile" },
    });
  },
});

export default function SignInPage() {
  return (
    <main>
      <form method="post">
        <input type="email" name="email" value="" />
        <input type="password" name="password" value="" />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
