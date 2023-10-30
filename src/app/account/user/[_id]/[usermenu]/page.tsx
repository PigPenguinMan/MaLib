"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserMenuPage = () => {
  const [menuName, setMenuName] = useState("");
  const { usermenu } = useParams() as { usermenu: string };

  useEffect(() => {
    setMenuName(usermenu);
  }, [usermenu]);

  return <>{dispMenuPage(menuName)}</>;
};

export default UserMenuPage;

function dispMenuPage(menuname: string) {
  if (menuname === "mypage") {
    return (
      <div>
        <div className=" text-2xl p-6">{menuname}</div>
        <div>
        </div>
      </div>
    );
  } else if (menuname === "editinfo") {
    return (
      <div>
        <div className=" text-2xl">{menuname}</div>
        <div>
          {/* 회원 id 표시 , 비밀번호 입력시 데이터베이스에서 해당 아이디와 비밀번호 조회 , 맞으면 정보수정 페이지로 이동  */}
        </div>
      </div>
    );
  } else if (menuname === "likelist") {
    return (
      <div>
        <div className=" text-2xl">{menuname}</div>
        <div>
            {/* 로그인한 유저가 좋아요를 누른 데이터 리스트로 표시  */}
        </div>
      </div>
    );
  } else if (menuname === "boardlist") {
    return (
      <div>
        <div className=" text-2xl">{menuname}</div>
        <div>
            {/* 로그인한 유저가 게시판에 쓴 글 리스트로 표시 */}
        </div>
      </div>
    );
  }
}
