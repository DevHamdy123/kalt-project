import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    // فك الـ Promise الخاص بالـ params بشكل مباشر وآمن
    const { id } = await params;

    // البحث عن المنتج في قاعدة البيانات باستخدام الـ id
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: {
          orderBy: {
            order: "asc",
          },
        },
        category: true,
      },
    });

    // التحقق من وجود المنتج في قاعدة البيانات
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // إرجاع بيانات المنتج بنجاح
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
