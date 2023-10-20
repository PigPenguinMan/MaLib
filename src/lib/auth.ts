// ref  https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./database";
import { randomBytes, randomUUID } from "crypto";
export const authOptions2: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/account/auth/signin",
  },
  session: {
    // ref https://next-auth.js.org/configuration/options#session
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 24 * 60 * 60, // 24시간
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        AccountName: {
          label: "AccountName",
          type: "text",
          placeholder: "Account Name",
        },
        Password: {
          label: "Password",
          type: "password",
          placeholder: 'Password ( "8" characters or more)',
        },
      },
      async authorize(credentials, req) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
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
  // callback ref https://next-auth.js.org/configuration/callbacks#redirect-callback

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      console.log(`baseurl url`,baseUrl+url);
      
      return baseUrl;
    },
    // When using the Credentials Provider the user object is the response returned from the authorize callback and the profile object is the raw body of the HTTP POST submission.
    // user = authorize의 리턴된 response , profile = POST의 raw body
    async signIn({ user, credentials }) {
      console.log("user", user);
      console.log("credential", credentials);
      const isAllowSignIn = true;
      if (isAllowSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
      }
      console.log("token account", account?.access_token);
      console.log("token", token);
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.name = token.name;
      }
      console.log("session", session);
      return session;
    },
  },
};
