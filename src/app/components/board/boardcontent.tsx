"use client";

import { IBoardContent } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const BoardContent = (props: IBoardContent) => {
  const { data: session } = useSession();
  
  // 게시판에 들어왔을때 게시판의 글중 session의 유저이름과 같은 이름을 가진 사람이 쓴글에 삭제,수정버튼 표시

  
  useEffect(() => {
    if (session?.user && session.user.Name === props.userName) {
      const btnwrap = document.getElementById("board_btnwrap");
      btnwrap?.classList.remove("invisible");
    }
  },[]);

  return (
    <div className="board_inner flex flex-col w-full h-full rounded-md p-2 border bg-Green/97 gap-y-3 min-h-[400px]">
      <div className="board_header flex items-center justify-between pb-2 border-b">
        <div className="flex gap-2">
          <div className="board_user_img">
            <Image
              src="/userImage.svg"
              alt="유저이미지"
              width={30}
              height={30}
            />
          </div>
          <div className="board_user_name text-xl">{props.userName}</div>
        </div>
        <div id="board_btnwrap" className="flex gap-2 invisible">
          <button className="board_update border  rounded-md hover:border-slate-100">
            <Image src="/update.svg" alt="수정아이콘" width={23} height={23} />
          </button>
          <button className="board_delete border  rounded-md hover:border-slate-100">
            <Image src="/delete.svg" alt="삭제아이콘" width={23} height={23} />
          </button>
        </div>
      </div>
      <div className="board_contents flex flex-col min-h-[75%]">
        <div className="board_content_text text-lg">{props.contentText}</div>
        {/* <div className="board_content_img"></div> */}
      </div>
      <div className="board_footer flex border-t">
        <div className="board_heart">{props.heart}</div>
        <div className="board_reply">{props.reply}</div>
        {/* 삭제버튼 , 수정버튼 만들기  */}
      </div>
    </div>
  );
};

export default BoardContent;
