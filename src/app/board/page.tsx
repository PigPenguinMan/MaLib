"use client";
import { IBoardContent, IBoardGETResponse } from "@/types/types";
import { Suspense, useEffect, useState } from "react";
import Loading from "../components/loading";
import BoardContent from "../components/board/boardcontent";
import BoardNav from "../components/board/boardnav";

const BoardMain = () => {
  const [boardData, setBoardData] = useState<IBoardContent[]>([]);
  const [isFetch, setIsFetch] = useState<Boolean>(false);
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/board`, {
        method: "GET",
      });
      const result: IBoardGETResponse = await response.json();
      if (result) {
        setBoardData(result.contents);
      }
      setIsFetch(true);
    } catch (err) {
      console.log("board page fetch Err", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    /**  
     * 11/12 유저가 로그인되어있다면 session의 role(admin/user)에 따라 글 삭제,수정 가능하게 하기
     * 그리고 session의 name과 Content의 userName이 같으면 삭제 수정버튼 나오게 하기
    */
    <div className="">
      <div className="board_main w-full  grow grid grid-cols-3 gap-5 pt-5 px-2 ">
        {/* 커뮤니티 게시판 ? 트위터 스타일 3xY? 인스타 스타일 ? 스레드 스타일  1xY? */}
        {/* 게시판 필터 ?  || 게시글 검색  */}
        <Suspense fallback={<Loading />}>
          {isFetch && boardData.length > 1 ? (
            boardData.map((content) => (
              <BoardContent key={content._id} {...content} />
            ))
          ) : (
            <p>데이터가 없습니다</p>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default BoardMain;
