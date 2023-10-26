import { IIsLoginProp } from "@/types/types";
import { signOut } from "next-auth/react";
import Link from "next/link";

const NavbarSign = ({isLogin,setIsLogin,user}:IIsLoginProp) => {
  return (
    <>
      {isLogin ? (
        <ul className="flex flex-row mx-6 ">
          <li className="userprofile flex flex-row">
            <Link href={`/account/user/${user?.id}/`}>
            <div className="user_img"></div>
            <div className="user_name">{user?.name}</div>
            </Link>
          </li>
          <li className="signout mx-2 border-2">
            <button onClick={()=>signOut()}>로그아웃</button>
          </li>
        </ul> 
      ) : (
        <ul className="flex flex-row mx-6 ">
          <li className="signin mx-2 border-2">
            <Link href="/account/auth/signin">로그인</Link>
          </li>
          <li className="signup mx-2 border-2">
            <Link href="/account/auth/signup">회원가입</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavbarSign;
