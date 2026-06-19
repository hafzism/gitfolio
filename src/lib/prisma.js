import { PrismaClient } from '../generated/prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Set up WebSocket support for Node.js environments
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

let prisma;

if (!globalForPrisma.prisma) {
  let connectionString = process.env.DATABASE_URL;

  if (connectionString) {
    // Strip accidental leading/trailing single or double quotes
    connectionString = connectionString.trim().replace(/^["']|["']$/g, '');

    // Log connection attempt (hiding credentials)
    try {
      const parsed = new URL(connectionString);
      console.log(`[Prisma] Connecting to database host: ${parsed.host}, database: ${parsed.pathname}`);
    } catch {
      console.log(`[Prisma] Connecting with connection string of length: ${connectionString.length}`);
    }

    // PrismaNeon is a factory — pass the config object directly (not a Pool instance).
    // The factory internally creates its own Pool using this config.
    const adapter = new PrismaNeon({ connectionString, webSocketConstructor: ws });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  } else {
    console.warn('[Prisma] Warning: DATABASE_URL is not set. All database calls will throw.');
    globalForPrisma.prisma = new PrismaClient();
  }
}

prisma = globalForPrisma.prisma;

export default prisma;
