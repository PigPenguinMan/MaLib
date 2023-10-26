"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const UserPageNavbar = () => {
  const [userMenu, setUserMenu] = useState('');
  const [selectedMenu,setSelectedMenu]= useState('');
  const [crnNav, setCrnNav] = useState<boolean>(false);
  const { data: session } = useSession();
  const uId= session?.user?.id
  const menuArr = [
    { value: "mypage", name: "마이페이지" },
    { value: "editinfo", name: "회원정보 수정" },
    { value: "likelist", name: "좋아요 목록" },
    { value: "boardlist", name: "게시글 목록" },
  ];
  const handleClickNav = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const selectedValue = e.currentTarget.getAttribute("value");
    if (selectedValue && !crnNav) {
      setSelectedMenu(selectedValue);
      setCrnNav(true);
    } else if (crnNav) {
      e.currentTarget.blur();
    }
  };
  const handleBlurNav = () => {
    setCrnNav(false);
  };
  useEffect(()=>{
    setUserMenu(selectedMenu)
  },[selectedMenu])
  return (
    <div className="w-full h-full">
      <ul className="flex flex-col items-center justify-center">
        {menuArr.map((menu) => (
          <li
            key={menu.name}
            className="usernav_list my-2"    
            onClick={handleClickNav}
            onBlur={handleBlurNav}
            value={menu.value}
          >
            <Link
              href={{
                pathname: `/account/user/${uId}/${userMenu}`,
              }}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPageNavbar;
