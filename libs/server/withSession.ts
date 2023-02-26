import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
    auth?: {
      email: string;
    };
  }
}

const cookieOptions = {
  cookieName: "tweetsession",
  password: process.env.COOKIE_PASSWORD!,
};

export default function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
