import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import withApiSession from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!foundToken)
    return res.json({
      ok: false,
      error: "Invalid Token. Please check again.",
    });

  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();

  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
