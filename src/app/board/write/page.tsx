"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
/** 11/12 write페이지에 진입시 useSession으로 불러온 session에 유저 데이터가 없으면 로그인페이지로 이동필요 */
const BoardWrite = () => {
  const [contentData, setContentData] = useState({
    user_name: "",
    board_content_text: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  /** 11/12 회원가입에서는 하나의 함수로 각 태그의 id값에 따라 value를 넣어줬지만
   * 실수로 input id값에 오타가 생길경우에는 태그별로 함수를 만들어 오타가 생겼어도 state에 값이 들어가도록 만들어보았다*/
  const handleContentTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setContentData({
      ...contentData,
      board_content_text: e.target.value,
    });
  };
  useEffect(() => {
    if (session?.user) {
      setContentData({
        ...contentData,
        user_name: session.user.Name,
      });
    }
  }, [session]);
  /** 11/12 데이터 넘어가는것 확인 , submit시 session의 유저이름 함께보내기   */
  const handleWriteSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(`${window.location.origin}/api/board`, {
      method: "POST",
      body: JSON.stringify(contentData),
      headers: {
        "Content-Type": "applcation/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      router.push("/board");
    } else {
      console.log("board write response err");
    }
  };

  return (
    <div className="board_write_wrap grid grid-cols-3  p-2">
      <div className="bg-Green/97 col-start-2 col-span-1 min-h-[400px] rounded-md border">
        <form onSubmit={handleWriteSubmit} className="flex flex-col h-full ">
          <input
            type="text"
            id="board_content_text"
            onChange={handleContentTextChange}
            className="board_write_content h-full px-2 text-lg bg-inherit focus:outline-none"
            placeholder="내용을 입력해주세요"
            value={contentData.board_content_text}
            required
          />
          <div className="board_write_footer flex justify-end p-2 border-t">
            {/* 11/12 이미지삽입 , 서식 바꿀수있는 툴 위치 footer? 아니면 form 아래 */}
            <button className="px-2 border rounded-md text-lg">작성</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite;
