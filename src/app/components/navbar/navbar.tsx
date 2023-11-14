"use client";

import SearchBar from "./searchbar";
import Link from "next/link";
import NavbarSign from "./signcheck";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const navList = [
    { name: "아카이브", link: "/archive" },
    { name: "게시판", link: "/board" },
  ];
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState();
  const { data: session, status } = useSession();
  const params = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLogin(true);
      
    } else if (status === "unauthenticated") {
      setIsLogin(false);
    }
    console.log("세션 데이터", session);
    console.log("로그인상태", status);
  }, [status]);
  useEffect(() => {
    // 현재 위치의 nav에 아랫줄(__) 표시
  }, []);

  return (
    <div className="flex flex-row items-center justify-between h-16 p-6 bg-DarkGreen/25 text-Green/90">
      <h1 className="">
        <a href="/">로고</a>
      </h1>
      {/* 로고 아이콘 */}
      {/* 메뉴 1~3 */}
      <nav>
        <ul className="flex flex-row">
          {navList.map((nav) => (
            <li key={nav.name}>
              <Link href={nav.link} className="px-2">
                {nav.name}
              </Link>
            </li>
          ))}
          {/* <li>
            <Link href="archive" className="px-2">성향 만화찾기</Link>
          </li> */}
        </ul>
      </nav>
      <div className="flex flex-row basis-2/3 justify-end">
        {/* 검색창 */}

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
