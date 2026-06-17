import { DefaultUser } from "next-auth";

export interface ExtendedUser extends DefaultUser {
  role: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
