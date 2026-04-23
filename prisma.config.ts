import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // في Prisma 7، الـ CLI بياخد الرابط المباشر من هنا عشان يعمل Migrate
    url: env("DIRECT_URL"),
  },
});
