import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const client = new PrismaClient();

if (process.env.NODE_ENV === "development") globalForPrisma.prisma = client;

export default client;
