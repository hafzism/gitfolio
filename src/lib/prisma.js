import { PrismaClient } from '../generated/prisma/client';
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis;

let prisma;

if (!globalForPrisma.prisma) {
  // Extract file path from connection string. Usually "file:./dev.db" or relative path.
  const dbUrl = process.env.DATABASE_URL || "file:./dev.db";
  const adapter = new PrismaBetterSqlite3({
    url: dbUrl,
  });
  globalForPrisma.prisma = new PrismaClient({ adapter });
}
prisma = globalForPrisma.prisma;

export default prisma;
