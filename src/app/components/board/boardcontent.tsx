"use client";

import { IBoardContentProps } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BoardContent = (content: IBoardContentProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleUpdateBtn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      router.push(`/board/update?id=${content._id}&contentText=${content.contentText}`);
    } catch (err) {
      console.error("Board Update Err", err);
    }
  };
  const handleDeleteBtn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      /** 11/15 API을 사용할때 API에서 return 하지않으면 TypeError: Cannot read properties of undefined (reading 'headers') 에러발생
       * API를 사용할때 항상 체크 필요
       */
      const response = await fetch(`api/board?id=${content._id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Board Delete Err", err);
    }
  };

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
          <div className="board_user_name text-xl">{content.userName}</div>
        </div>
        {/* 11/15 props인 content의 userName과 Session의 유저이름이 같으면 수정 삭제버튼이 나오게 만듬
         * session의 Role이 admin일때도 동일하게 제작필요
         */}
        {content.userName === session?.user?.Name ? (
          <div id="board_btnwrap" className="flex gap-2 ">
            <button
              onClick={handleUpdateBtn}
              className="board_update border  rounded-md hover:border-slate-100"
            >
              <Image
                src="/update.svg"
                alt="수정아이콘"
                width={23}
                height={23}
              />
            </button>
            <button
              onClick={handleDeleteBtn}
              className="board_delete border  rounded-md hover:border-slate-100"
            >
              <Image
                src="/delete.svg"
                alt="삭제아이콘"
                width={23}
                height={23}
              />
            </button>
          </div>
        ) : (
          <div id="board_btnwrap" className="flex gap-2 invisible">
            <button className="board_update border  rounded-md hover:border-slate-100">
              <Image
                src="/update.svg"
                alt="수정아이콘"
                width={23}
                height={23}
              />
            </button>
            <button className="board_delete border  rounded-md hover:border-slate-100">
              <Image
                src="/delete.svg"
                alt="삭제아이콘"
                width={23}
                height={23}
              />
            </button>
          </div>
        )}
      </div>
      <div className="board_contents flex flex-col min-h-[75%]">
        <div className="board_content_text text-lg">{content.contentText}</div>
        {/* <div className="board_content_img"></div> */}
      </div>
      <div className="board_footer flex border-t">
        <div className="board_heart">{content.heart}</div>
        <div className="board_reply">{content.reply}</div>
        {/* 삭제버튼 , 수정버튼 만들기 완료  */}
      </div>
    </div>
  );
};

export default BoardContent;
