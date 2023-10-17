// ref  https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./database";
export const authOptions2: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/account/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const response = await fetch("/api/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await response.json();
        if (response.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
};
