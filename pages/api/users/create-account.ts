import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import smtpTransport from "@/libs/server/email";
import { hashPassword } from "@/libs/server/hash";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ ok: false });
  const alreadyExists = Boolean(
    await client.user.findUnique({
      where: {
        email,
      },
    })
  );
  if (alreadyExists) {
    return res.json({
      ok: false,
      error: "Email already taken.",
    });
  }
  const hashedPassword = await hashPassword(password);
  const payload = `${Math.floor(100000 + Math.random() * 900000)}`;
  const token = await client.token.create({
    data: {
      payload,
      user: {
        create: {
          name: "Anonymous",
          email,
          password: hashedPassword,
        },
      },
    },
  });
  console.log("token:", token);

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Tweeter email verification",
    text: `Verification Code : ${payload}`,
  };
  const result = await smtpTransport.sendMail(
    mailOptions,
    (error, responses) => {
      if (error) {
        console.log(error);
        return null;
      } else {
        console.log(responses);
        return null;
      }
    }
  );
  smtpTransport.close();
  console.log(result);
  return res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });