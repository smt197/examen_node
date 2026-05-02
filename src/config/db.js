import { PrismaClient } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

export default class Database {
  constructor() {}

  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  adapter = new PrismaPg(this.pool);

  prisma = new PrismaClient({
    adapter: this.adapter,
    log: ["query", "error"],
  });
}
