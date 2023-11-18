import { IIsLoginProp } from "@/types/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const NavbarSign = ({isLogin,setIsLogin,user}:IIsLoginProp) => {
  
  return (
    <>
    {/* 버튼에 마우스 호버됐을대 배경색 변화 or 버튼 크기변화 */}
      {isLogin ? (
        <ul className="flex flex-row mx-6 gap-2 ">
          <li className="userprofile flex flex-row items-center rounded-md px-2 gap-2">
            <Link href={`/account/user/${user?.id}/`}>
            <div className="user_img"> <Image src="/userimage.svg" alt="유저이미지" width={30} height={30} /></div>
            </Link>
            <div className="user_name">{user?.Name}</div>
          </li>
          <li className="signout flex px-2 border rounded-md hover:bg-Green/97 hover:text-DarkGreen/25/90">
            <button className="text-center" onClick={()=>signOut()}>로그아웃</button>
          </li>
        </ul> 
      ) : (
        <ul className="flex flex-row mx-6 gap-2 ">
          <li className="signin px-2 border rounded-md hover:bg-Green/97 hover:text-DarkGreen/25/90">
            <Link href="/account/auth/signin">로그인</Link>
          </li>
          <li className="signup px-2  border rounded-md hover:bg-Green/97 hover:text-DarkGreen/25/90">
            <Link href="/account/auth/signup">회원가입</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavbarSign;
