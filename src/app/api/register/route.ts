import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // 1. التأكد من وصول البيانات الأساسية
    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // 2. فحص إذا كان البريد الإلكتروني مسجل مسبقاً
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    // 3. تشفير كلمة المرور قبل الحفظ
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. إنشاء المستخدم في قاعدة البيانات
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        // الـ Role هيتم تعيينه تلقائياً لـ USER بناءً على الـ Schema
      },
    });

    // 5. إرجاع رسالة نجاح (بدون إرجاع الباسورد المشفر)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: newUser.id, email: newUser.email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "System Malfunction" },
      { status: 500 },
    );
  }
}
