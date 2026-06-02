import { DefaultUser } from "next-auth";

// 1. تعريف النوع المخصص اللي هنستخدمه في كل مكان
export interface ExtendedUser extends DefaultUser {
  role: string;
}

// 2. تمديد المكتبة (استخدمنا ExtendedUser مباشرة بدل interface فاضية)
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  // شيلنا interface User لأنها كانت هي سبب المشكلة (empty interface)
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
