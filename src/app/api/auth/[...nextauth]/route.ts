// ref https://reacthustle.com/blog/how-to-implement-mongodb-authentication-in-nextjs-nextauthjs
// https://next-auth.js.org/configuration/initialization
import NextAuth from "next-auth/next";
import { authOptions2 } from "@/lib/auth";
const handler = NextAuth(authOptions2);
export { handler as POST, handler as GET };
// const nextauthOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         AccountName: {
//           label: "AccountName",
//           type: "text",
//           placeholder: "TYPE AccountName",
//         },
//         Password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials,req) {
//         try {
//           const response = await fetch(`${process.env.NEXTAUTH_URL_INTERNAL}/api/signin`,{
//             method:"POST",
//             headers:{
//               "Content-Type" : "application/json"
//             },
//             body:JSON.stringify({
//               AccountName:credentials?.AccountName,
//               Password:credentials?.Password
//             })
//           })
//           const user = await response.json();

//           console.log('AUTH API user',user);

//           if(user){
//             return user ;
//           } else {
//             return null ;
//           }
//         } catch (err) {
//           throw new Error(`AUTH API ERROR ,${err}`)
//         }
//         },
//     }),
//   ],
//   pages:{
//     signIn:"/account/signin"
//   },

// };

// const client = await clientPromise;
// const userCollection = client
//   .db(process.env.MONGODB_DB_NAME)
//   .collection("User");
// const userMail = credentials?.Email.toLowerCase();
// const user = await userCollection.findOne({ userMail });
// if (!user) {
//   throw new Error("User not exsist");
// }
// const passwordValid = await bcrypt.compare(
//   credentials?.Password!,
//   user.password
// );
// if (!passwordValid) {
//   throw new Error("Invalid Password");
// }
// return {
//   id: user._id.toString(),
//   ...user,
// };
