import { page, PageProps } from "fresh";
import { define } from "../utils.ts";

// interface User extends JsonObject {
//   id: number;
//   name: string;
// }
interface User {
  id: number;
  name: string;
}

interface Props {
  user: User;
}

type Jsonify<T> = T extends string | number | boolean | null ? T
  : T extends Array<infer U> ? Jsonify<U>[]
  : T extends object ? { [K in keyof T]: Jsonify<T[K]> }
  : never;

/**
 * Type for all values that may be serialized to JSON
 */
type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];

/**
 * Interface for objects that may be serialized to JSON
 */
interface JsonObject extends Record<string, JsonValue> {}

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
