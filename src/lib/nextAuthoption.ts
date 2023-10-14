import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./database";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";

export const nextauthOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        Email : {
          label:'Email',
          type:'text'
        },
        Password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const userCollection = client
          .db(process.env.MONGODB_DB_NAME)
          .collection("User");
        const Email = credentials?.Email.toLowerCase();
        const user = await userCollection.findOne({ Email });
        if (!user) {
          throw new Error("User not exsist");
        }
        const passwordValid = await bcrypt.compare(
          credentials?.Password!,
          user.password
        );
        if (!passwordValid) {
            throw new Error("Invalid Password");
        }
        return {
            id: user._id.toString(),
            ...user
        }
    },
    }),
  ],
};
