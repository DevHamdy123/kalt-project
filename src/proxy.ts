import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// الفانكشن دي لازم يكون اسمها proxy في النسخ الجديدة
export function proxy(request: NextRequest) {
  // حالياً بنقوله: عدّي كل الناس بسلام
  return NextResponse.next();
}

// وممكن تحدد الفولدرات اللي الـ proxy يشتغل عليها بس (مثلاً الـ admin)
export const config = {
  matcher: ["/admin/:path*"],
};
