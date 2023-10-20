import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module 'next-auth'{
    interface Session extends DefaultSession{
        user? : {
            id?: string;
        } & DefaultSession['user'];
        accessToken : string ;
        }
    interface JWT extends DefaultJWT{
        id : string ; 
        accessToken : string ;

    }
    }
