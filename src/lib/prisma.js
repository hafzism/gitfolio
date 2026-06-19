import { PrismaClient } from '../generated/prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
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

    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    globalForPrisma.prisma = new PrismaClient({ adapter });
  } else {
    console.warn("Warning: DATABASE_URL environment variable is missing. Prisma Client initialized in fallback mode.");
    globalForPrisma.prisma = new PrismaClient({
      adapter: {
        queryRaw: async () => { throw new Error("DATABASE_URL is missing"); },
        executeRaw: async () => { throw new Error("DATABASE_URL is missing"); },
        model: {},
        provider: "postgresql",
      }
    });
  }
}
prisma = globalForPrisma.prisma;

export default prisma;
