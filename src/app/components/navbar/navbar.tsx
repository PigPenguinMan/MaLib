"use client";

import SearchBar from "./searchbar";
import Link from "next/link";
import NavbarSign from "./signcheck";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


const NavBar = () => {
  const navList = [
    { id : "nav01", name: "메인", path: "/"},
    { id : "nav02", name: "아카이브", path: "/archive" },
    { id : "nav03", name: "게시판", path: "/board" },
  ];
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>("");
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const handleNavClick =(e:React.MouseEvent)=>{
    setCurrentPage(e.currentTarget.id);

  }
  useEffect(() => {
    if (status === "authenticated") {
      setIsLogin(true); 
    } else if (status === "unauthenticated") {
      setIsLogin(false);
    }
  }, [status]);
 
  return (
    <div className="flex flex-row items-center justify-between h-16 p-6 bg-DarkGreen/25 text-Green/90">
      <h1 className="">
        <a href="/">로고</a>
      </h1>
      <nav>
        <ul className="flex flex-row">
          {navList.map((nav) => (
            // 11/16 navbar의 li중 style에서 현재페이지 위치인 pathName과 nav.path가 같은 li의 배경색을 바꿔 현재위치 표시
            <li key={nav.name} onClick={handleNavClick} id={nav.name} className="nav_link px-2 rounded-md  hover:bg-white/30" style={{backgroundColor : nav.path === pathName ? 'rgb(255,255,255,0.3)': 'inherit' ,}}  >
              <Link href={nav.path} className="">
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-row basis-2/3 justify-end">
        <div className="searchbar px-22 mx-6 ">
          <SearchBar />
        </div>
        {/* 로그인 회원가입 | 로그아웃 버튼 컴포넌트화시키기 */}
        <NavbarSign
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          user={session?.user}
        />
      </div>
    </div>
  );
};

export default NavBar;
// 필요한 기능
// 로고 , 메뉴1~3 , 검색창 , 로그인 , 회원가입 , 로그아웃
// Position - sticky 상단고정 ( 헤더에 할지 네브바에 할지)
