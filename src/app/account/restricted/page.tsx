import { nextauthOptions } from "@/lib/nextAuthoption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**  10/11 페이지 접근시 오류 발생 보안문제인듯 ? API 만든 후 꼭확인 
 *[next-auth][warn][NEXTAUTH_URL] 
*https://next-auth.js.org/warnings#nextauth_url
*[next-auth][warn][NO_SECRET] 
*https://next-auth.js.org/warnings#no_secret
 */
// https://jeongyunlog.netlify.app/develop/nextjs/next-auth/
export default async function RestrictedPage (){
    // 세션 값 가져오기
    const session = await getServerSession(nextauthOptions);
    // 세션이 없을경우엔 회원가입창으로 이동
    if(!session?.user){
        const url = new URL('/api/auth/signin','https://localhost:3000');
        url.searchParams.append('callBackUrl',"/restricted")
        redirect(url.toString());
    }
    return (
        <div>
            <h1>RestrictedPage  입니다 , {session?.user?.name}</h1>
        </div>
    )
}