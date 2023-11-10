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
    <>
    <BoardNav/>
    <div className="board_main w-full px-28 grow grid grid-cols-3 gap-5 pt-5 ">
      {/* 커뮤니티 게시판 ? 트위터 스타일 3xY? 인스타 스타일 ? 스레드 스타일  1xY? */}
      {/* 게시판 필터 ?  || 게시글 검색  */}
      <Suspense fallback={<Loading />}>
        {isFetch && boardData.length > 1 ? (
          boardData.map((content) => <BoardContent key={content._id} {...content} />)
          ) : (
            <p>데이터가 없습니다</p>
            )}
      </Suspense>
    </div>
            </>
  );
};

export default BoardMain;
