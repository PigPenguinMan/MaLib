// ref  https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions, } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./database";


export const authOptions2: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_DB_NAME,
    collections: {
      Accounts: "Account",
      Sessions: "Session",
      Users: "User",
      VerificationTokens: "VerificationTokens",
    },
  }),
  pages: {
    signIn: "/account/auth/signin",
  },
  session: {
    // ref https://next-auth.js.org/configuration/options#session
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 24 * 60 * 60, // 24시간
  },
  // ref https://remaster.com/blog/next-auth-jwt-session
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
        const request = req.body;
        // req.body === user
        console.log(user);
        

        // console.log('requ',request);

        if (response.ok && user) {
          return user as any;
        }
        return null;
      },
    }),
  ],
  // callback ref https://next-auth.js.org/configuration/callbacks#redirect-callback

  callbacks: {
    async signIn({ user, credentials }) {
      // console.log("Callback user ", user);
      const isAllowSignIn = true;
      if (isAllowSignIn && user) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        url = baseUrl;
        return url;
      }
      return baseUrl;
    },
    jwt: async (params: {
      token: any;
      user: any;
      trigger?: any;
      session?: any;
    }): Promise<any> => {
      const { token, user, trigger, session } = params;
      if (user) {
        token.user = {...user};
        token.user.Name = user.Name;
        token.user.Role = user.Role;
        token.user.id = user._id
      }
      if (trigger === "update" && session.name) {
        token.user.name = session.name;
      }
      // console.log('token',token)
      // console.log('token user',user)
      // console.log('token session',session);
      // console.log('-----');

      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      // console.log('session session',session)
      // console.log('session token',token)
      session.user.Name = token.user.Name;
      session.user.Role = token.user.Role;
      session.user.id = token.user.id
      return session;
    },
  },
};
