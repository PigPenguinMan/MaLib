// ref https://reacthustle.com/blog/how-to-implement-mongodb-authentication-in-nextjs-nextauthjs
// https://next-auth.js.org/configuration/initialization
import NextAuth from "next-auth/next";
import { authOptions2 } from "@/lib/auth";
const handler = NextAuth(authOptions2);
export { handler as GET, handler as POST };
