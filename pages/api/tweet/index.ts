import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import withApiSession from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      query: { page },
    } = req;
    const limit = 5;
    const tweetCount = await client.tweet.count();
    const tweets = await client.tweet.findMany({
      take: limit,
      skip: (Number(page) - 1) * limit,
      orderBy: {
        createdAt: "desc",
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
    const lastPage = Math.ceil(tweetCount / limit);
    res.json({ ok: true, tweets, lastPage });
  }
  if (req.method === "POST") {
    const {
      body: { text },
      session: { user },
    } = req;
    const tweet = await client.tweet.create({
      data: {
        text: text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
