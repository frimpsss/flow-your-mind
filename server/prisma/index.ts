import { PrismaClient } from "@prisma/client";
export const dburl =
  process.env.NODE_ENV == "development"
    ? process.env.DATABASE_URL
    : process.env.PROD_DATABASE_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dburl,
    },
  },
});
