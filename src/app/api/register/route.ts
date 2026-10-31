import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as z from "zod";

// Same rules as the register form, enforced on the server as well
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. التأكد من صحة البيانات القادمة
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Missing or invalid fields" },
        { status: 400 },
      );
    }
    const { email, password, name } = parsed.data;

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
