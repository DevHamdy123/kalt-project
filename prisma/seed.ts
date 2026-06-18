import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// بدلاً من السطر اللي موجود عندك، استخدم ده:
if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile();
}

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(" Starting seed (KALT Collections)...");

  // await prisma.image.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();

  const categories = {
    statementPieces: await prisma.category.create({
      data: { name: "STATEMENT PIECES", slug: "statement-pieces" },
    }),
    everydayEssentials: await prisma.category.create({
      data: { name: "EVERYDAY ESSENTIALS", slug: "everyday-essentials" },
    }),
    timelessClassics: await prisma.category.create({
      data: { name: "TIMELESS CLASSICS", slug: "timeless-classics" },
    }),
    seasonalCollections: await prisma.category.create({
      data: { name: "SEASONAL COLLECTIONS", slug: "seasonal-collections" },
    }),
  };

  /*  
  const products = [
    {
      name: "Cyber Field Zip Hoodie",
      slug: "cyber-field-zip-hoodie",
      description: "Brutalist-inspired outerwear built for the elements.",
      price: 210.0,
      images: ["/images/img6.webp"],
      categoryId: categories.statementPieces.id,
    },
    // 
    {
      name: "Stealth Windbreaker Hoodie",
      slug: "stealth-windbreaker-hoodie",
      description: "Lightweight, water-resistant, and stealthy technical cut.",
      price: 180.0,
      images: ["/images/img26.webp"],
      categoryId: categories.seasonalCollections.id,
    },
  ];
  */

  /*  
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        stock: 50,
        isFeatured: true,
        categoryId: p.categoryId,
        images: {
          create: p.images.map((url, i) => ({ url, order: i + 1 })),
        },
      },
    });
  }
  */

  console.log(" Seed finished successfully! Only Categories are handled now.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
