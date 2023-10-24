import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id : string;
    name : string;
    role : string;

    } & DefaultSession["user"];
    accessToken: string;
  };
  interface JWT extends DefaultJWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  };
  // interface User extends DefaultUser {
  //   _id: string;
  //   AccountName: string;
  //   Password: string;
  //   Name: string;
  //   Role: string;
  //   Created_At: string;
  //   Updated_At: string;
  //   Profile_pic: string;
  //   Is_Adult: boolean;
  // };
  // interface Session {
  //   refreshTokenExpires?: number;
  //   accessTokenExpires?: string;
  //   refreshToken?: string;
  //   token?: string;
  //   error?: string;
  //   user?: AdapterUser;
  // }
}
