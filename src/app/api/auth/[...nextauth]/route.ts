// ref https://reacthustle.com/blog/how-to-implement-mongodb-authentication-in-nextjs-nextauthjs
// https://next-auth.js.org/configuration/initialization
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/database";

const nextauthOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        Email: {
          label: "Email",
          type: "text",
          placeholder: "이메일을 입력해주세요 (xxxx@example.com)"
        },
        Password: {
          label: "Password",
          type: "password",
          placeholder:"비밀번호를 입력해주세요 (8자 이상)"
        },
      },
      async authorize(credentials,req) {
        try {
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`,{
            method:'POST',
            headers:{
              'Content-Type' :'applicaiton/json'
            },
            body:JSON.stringify({
              Email : credentials?.Email,
              Password : credentials?.Password,
            })
          })
          console.log('response',response);
          
          const user = await response.json();
          console.log('user',user);
          
          if(user){
            return user
          }else { 
            return null 
          }
        } catch (err) {
          console.log('Signin API Err',err);
          
        }
        const client = await clientPromise;
        const userCollection = client
          .db(process.env.MONGODB_DB_NAME)
          .collection("User");
        const userMail = credentials?.Email.toLowerCase();
        const user = await userCollection.findOne({ userMail });
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
          ...user,
        };
      },
    }),
  ],
  pages:{
    signIn : '/account/signin'
  }
};

const handler = NextAuth(nextauthOptions);


export {handler as POST, handler as GET}