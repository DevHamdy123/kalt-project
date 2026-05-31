import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "4"); // عدد الكروت في الصفحة
  const categorySlug = searchParams.get("category"); // هنفلتر بالـ Slug

  const skip = (page - 1) * limit;

  try {
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          isArchived: false,
          category: categorySlug ? { slug: categorySlug } : undefined,
        },
        include: { images: { orderBy: { order: "asc" } }, category: true },
        orderBy: { createdAt: "asc" },
        skip,
        take: limit,
      }),
      prisma.product.count({
        where: {
          isArchived: false,
          category: categorySlug ? { slug: categorySlug } : undefined,
        },
      }),
    ]);

    return NextResponse.json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
