import { page, PageProps } from "fresh";
import { define } from "../utils.ts";
import { type JsonCompatible } from "@5t111111/fresh-session";

interface User {
  id: number;
  name: string;
}

interface Props {
  user: User;
}

export const handler = define.handlers({
  async GET(ctx) {
    const session = ctx.state.session;
    const isAuthenticated = session.get<boolean>("isAuthenticated");
    const userId = session.get<number>("userId");

    console.log(isAuthenticated, userId);

    if (!isAuthenticated) {
      return new Response(null, {
        status: 307,
        headers: { Location: "/sign_in" },
      });
    }

    const user = { id: userId, name: "Deno" };

    console.log(user);

    return page({
      user,
    });
  },
});

export default function ProfilePage({ data }: PageProps<Props>) {
  const { user } = data;

  return (
    <main>
      <h1>Profile</h1>
      <p>
        {user.name}'s profile page. You cannot visit this page before sigining
        in.
      </p>
    </main>
  );
}
