import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// في التحديث الجديد Next.js بيتعامل مع الملف كـ Proxy
export default withAuth(
  function proxy(req) {
    // بنسحب التوكن بتاع اليوزر اللي جواه الـ role
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // بنحدد المسار اللي اليوزر بيحاول يدخله
    const isTryingToAccessAdmin = pathname.startsWith("/admin");
    const isTryingToAccessAuth =
      pathname.startsWith("/login") || pathname.startsWith("/register");

    // 1. حماية الداشبورد: لو بيحاول يدخل الداشبورد، والـ role بتاعه مش أدمن
    if (isTryingToAccessAdmin && token?.role !== "ADMIN") {
      // هنرجعه فوراً للصفحة الرئيسية
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. حماية اللوجين: لو مسجل دخول (معاه توكن) وبيحاول يفتح صفحة اللوجين أو التسجيل
    if (isTryingToAccessAuth && token) {
      // هنرجعه فوراً للصفحة الرئيسية
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 3. لو كله تمام، هيكمل في طريقه عادي مع إضافة منع الكاش
    const response = NextResponse.next();

    // إجبار المتصفح يمسح الصفحة من الكاش (عشان زرار الرجوع)
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname;

        // لو بيحاول يدخل اللوجين أو التسجيل، بنسمحله يعدي (عشان دالة proxy فوق تقرر هتطرده ولا لأ)
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
          return true;
        }

        // لو بيحاول يدخل أي مسار تاني (زي أدمن)، لازم يكون عامل تسجيل دخول أصلاً
        return !!token;
      },
    },
  },
);

// تحديد المسارات اللي الـ Proxy هيراقبها (ضفنا مسارات اللوجين والتسجيل)
export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
