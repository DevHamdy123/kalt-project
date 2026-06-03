import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// في التحديث الجديد Next.js بيتعامل مع الملف كـ Proxy
export default withAuth(
  function proxy(req) {
    // بنسحب التوكن بتاع اليوزر اللي جواه الـ role
    const token = req.nextauth.token;

    // بنحدد المسار اللي اليوزر بيحاول يدخله
    const isTryingToAccessAdmin = req.nextUrl.pathname.startsWith("/admin");

    // لو اليوزر بيحاول يدخل الداشبورد، والـ role بتاعه مش أدمن
    if (isTryingToAccessAdmin && token?.role !== "ADMIN") {
      // هنرجعه فوراً للصفحة الرئيسية
      return NextResponse.redirect(new URL("/", req.url));
    }

    // لو أدمن، هيكمل في طريقه عادي
    return NextResponse.next();
  },
  {
    callbacks: {
      // الدالة دي بتضمن إن الفلترة دي مش هتتنفذ غير لو اليوزر عامل تسجيل دخول أصلاً
      authorized: ({ token }) => !!token,
    },
  },
);

// تحديد المسارات اللي الـ Proxy هيراقبها
export const config = {
  matcher: ["/admin/:path*"],
};
