import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import withApiSession from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await client.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, tweet, likes: tweet?._count.likes, isLiked });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
