import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const client = new PrismaClient();

if (process.env.NODE_ENV === "development") global.db = client;

export default client;
