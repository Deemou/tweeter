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
  password: "4@-bQG9Cgjpe7wVfX%Qd971n34?m!+xK2?fW!vtn784e0",
};

export default function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
