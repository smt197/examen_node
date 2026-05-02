import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  earlyAdopter: true,
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
