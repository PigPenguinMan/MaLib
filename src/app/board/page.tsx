"use client"

import { IBoardContentProps, IBoardGETResponse } from "@/types/types";
import { Suspense, useEffect, useState } from "react";
import Loading from "../components/loading";
import BoardContent from "../components/board/boardcontent";
import Image from "next/image";

const BoardMain = () => {
  const [boardData, setBoardData] = useState<IBoardContentProps[]>([]);
  const [isFetch, setIsFetch] = useState<Boolean>(false);
  const [pageNm, setPageNm] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/board?pageNm=${pageNm}`, {
        method: "GET",
        headers: {
          "Content-Type": "applcation/json",
        },
      });
      const result: IBoardGETResponse = await response.json();
      if (result) setBoardData(result.contents);
      setIsFetch(true);
    } catch (err) {
      console.log("board page fetch Err", err);
    }
  };

  // pageNm가 바뀔때마다 게시판 데이터 패치받아오기
  useEffect(() => {
    fetchData();
  }, [pageNm]);

  /** pageNm가 0이하로 내려가지않게 하기위해 0이하일떈 이전 페이지버튼 disabled
   * 11/14 pageNm 최대치에 갔을때 다음 페이지버튼 disabled 필요 API에서 불러오는 length가 8이하일때 disabled 시키기  -- 처리
   * 11/15 boardData가 9개보다 적으면 다음페이지버튼 disabled
   */
  useEffect(() => {
    const prevbtn = document.getElementById(
      "board_prevbtn"
    ) as HTMLButtonElement; // ButtonElement로 타입지정해 null이 나오지않는다
    const nextbtn = document.getElementById(
      "board_nextbtn"
    ) as HTMLButtonElement;
    if (pageNm <= 0) {
      prevbtn.disabled = true;
    } else {
      prevbtn.disabled = false;
    }
    if (boardData.length < 9) {
      nextbtn.disabled = true;
    } else {
      nextbtn.disabled = false;
    }
  }, [boardData]);

  return (
    /**
     * 11/12 유저가 로그인되어있다면 session의 role(admin/user)에 따라 글 삭제,수정 가능하게 하기
     * 그리고 session의 name과 Content의 userName이 같으면 삭제 수정버튼 나오게 하기
     */
    <div className="flex flex-col items-center ">
      <div className="board_main w-full  grow grid grid-cols-3 gap-5 py-3  px-2 ">
        {/* 커뮤니티 게시판 ? 트위터 스타일 3xY? 인스타 스타일 ? 스레드 스타일  1xY? */}
        {/* 게시판 필터 ?  || 게시글 검색  */}
        <Suspense fallback={<Loading />}>
          {isFetch && boardData.length > 1 ? (
            boardData.map((content) => (
              <BoardContent key={content._id} {...content}  />
            ))
          ) :  (
            <p>데이터가 없습니다</p>
          )}
        </Suspense>
      </div>
      <div className="board_pagebtnwrap flex gap-4 pb-2">
        <button
          onClick={() => {
            setPageNm(pageNm - 1);
          }}
          id="board_prevbtn"
          className="rounded-md border hover:border-slate-100"
        >
          <Image
            src="/prevbtn.svg"
            alt="이전페이지 아이콘"
            width={25}
            height={25}
          />
        </button>
        <button
          onClick={() => {
            setPageNm(pageNm + 1);
          }}
          id="board_nextbtn"
          className="rounded-md border hover:border-slate-100"
        >
          <Image
            src="/nextbtn.svg"
            alt="다음페이지 아이콘"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
};

export default BoardMain;
