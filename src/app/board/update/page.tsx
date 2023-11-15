"use client";
// 게시글 수정 페이지
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const BoardUpdate = () => {
  const [contentData, setContentData] = useState({
    user_name: "",
    board_content_text: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const handleContentTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setContentData({
      ...contentData,
      board_content_text: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/board?id=${id}`, {
      method: "PATCH",
      body: JSON.stringify(contentData),
      headers: {
        "Content-Type": "applcation/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      router.push("/board");
    } else {
      console.log("board update response err");
    }
  };
 
//   useEffect(() => {
//     if (session?.user) {
//       setContentData({
//         ...contentData,
//         user_name: session.user.Name,
//       });
//     }
//   }, [session]);

  /** 11/15 게시글 수정으로 넘어왔을때 url의 contentText를 내용에 삽입 */
  useEffect(() => {
    if (searchParams.has("contentText")) {
      const contentText = searchParams.get("contentText");
      if (contentText)
        setContentData({
          ...contentData,
          board_content_text: contentText,
        });
    }
    if (session?.user) {
        setContentData({
          ...contentData,
          user_name: session.user.Name,
        });
      }
  }, []);

  

  return (
    <div className="board_write_wrap grid grid-cols-3  p-2">
      <div className="bg-Green/97 col-start-2 col-span-1 min-h-[400px] rounded-md border">
        <form onSubmit={handleUpdateSubmit} className="flex flex-col h-full ">
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
            <button className="px-2 border rounded-md text-lg">작성</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardUpdate;
