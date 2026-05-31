import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

process.loadEnvFile();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("⏳ Starting seed (KALT Collections)...");

  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

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

  const products = [
    {
      name: "Cyber Field Zip Hoodie",
      slug: "cyber-field-zip-hoodie",
      description: "Brutalist-inspired outerwear built for the elements.",
      price: 210.0,
      images: ["/images/img6.webp"],
      categoryId: categories.statementPieces.id,
    },
    {
      name: "Tactical Oversized Hoodie",
      slug: "tactical-oversized-hoodie",
      description:
        "Utility meets modern streetwear precision in a heavy drape.",
      price: 145.0,
      images: ["/images/img16.webp"],
      categoryId: categories.statementPieces.id,
    },
    {
      name: "Heavyweight Knit Hoodie",
      slug: "heavyweight-knit-hoodie",
      description: "Ultimate urban comfort piece.",
      price: 120.0,
      images: ["/images/img13.webp"],
      categoryId: categories.statementPieces.id,
    },

    {
      name: "Minimalist Essential Hoodie",
      slug: "minimalist-essential-hoodie",
      description: "Clean lines for the everyday uniform.",
      price: 95.0,
      images: ["/images/img21.webp"],
      categoryId: categories.everydayEssentials.id,
    },
    {
      name: "Urban Oversized Hoodie",
      slug: "urban-oversized-hoodie",
      description: "Streetwear aesthetic, perfect fit.",
      price: 110.0,
      images: ["/images/img1.webp"],
      categoryId: categories.everydayEssentials.id,
    },
    {
      name: "Raw Crop Heavyweight Hoodie",
      slug: "raw-crop-heavyweight-hoodie",
      description: "The core boxy foundation of your minimalist wardrobe.",
      price: 89.0,
      images: ["/images/img18.webp"],
      categoryId: categories.everydayEssentials.id,
    },

    {
      name: "KALT Signature Hoodie",
      slug: "kalt-signature-hoodie",
      description: "Premium heavyweight cotton hoodie.",
      price: 85.0,
      images: ["/images/img11.webp"],
      categoryId: categories.timelessClassics.id,
    },
    {
      name: "Classic Boxy Hoodie",
      slug: "classic-boxy-hoodie",
      description: "Timeless silhouette.",
      price: 75.0,
      images: ["/images/img25.webp"],
      categoryId: categories.timelessClassics.id,
    },
    {
      name: "Syndicate Zip-Up Hoodie",
      slug: "syndicate-zip-up-hoodie",
      description: "Versatile layering with brutalist raw details.",
      price: 105.0,
      images: ["/images/img17.webp"],
      categoryId: categories.timelessClassics.id,
    },

    {
      name: "Graphic Print Hoodie",
      slug: "graphic-print-hoodie",
      description: "Bold design, signature KALT.",
      price: 130.0,
      images: ["/images/img8.webp"],
      categoryId: categories.seasonalCollections.id,
    },
    {
      name: "Utility Industrial Hoodie",
      slug: "utility-industrial-hoodie",
      description: "Functional detailing engineered for urban exploration.",
      price: 115.0,
      images: ["/images/img12.webp"],
      categoryId: categories.seasonalCollections.id,
    },
    {
      name: "Stealth Windbreaker Hoodie",
      slug: "stealth-windbreaker-hoodie",
      description: "Lightweight, water-resistant, and stealthy technical cut.",
      price: 180.0,
      images: ["/images/img26.webp"],
      categoryId: categories.seasonalCollections.id,
    },
  ];

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

  console.log(
    "✅ Seed finished successfully! 12 Premium Hoodies distributed across 4 collections.",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
