import { page, PageProps } from "fresh";
import { define } from "../utils.ts";
import { Jsonify } from "fresh-session";

interface User {
  id: number;
  name: string;
}

interface Props {
  user: User;
}

export const handler = define.handlers({
  GET: (ctx) => {
    const session = ctx.state.session;
    const user = session.get<Jsonify<User>>("user");

    if (!user) {
      return new Response(null, {
        status: 307,
        headers: { Location: "/sign_in" },
      });
    }

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
