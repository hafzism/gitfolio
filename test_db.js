const fs = require('fs');
const path = require('path');

// Parse .env manually
const envPath = '/home/hafeez/projects/hack2skill/.env';
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');
const env = {};
for (const line of envLines) {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    let val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
}

console.log("Parsed Env DATABASE_URL:", env.DATABASE_URL);
process.env.DATABASE_URL = env.DATABASE_URL;

const ws = require('ws');
const { PrismaClient } = require('/home/hafeez/projects/hack2skill/src/generated/prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');

const connectionString = process.env.DATABASE_URL.trim().replace(/^["']|["']$/g, '');
console.log("Cleaned Connection String:", connectionString);

// Pass config object directly to PrismaNeon in Prisma 7
const adapter = new PrismaNeon({ connectionString, webSocketConstructor: ws });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Attempting database query...");
  const portfolios = await prisma.portfolio.findMany();
  console.log("Success! Portfolios count:", portfolios.length);
}

main().catch(err => {
  console.error("Test Error:", err);
});
