"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

// 네브바에 사용할 검색창
// 필터 ( 제목 , 작가이름 , 장르 ) , 입력창 , 돋보기아이콘

const SearchBar = () => {
  const [ftValue, setFtValue] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  //  event타입 지정
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?${ftValue}=${searchValue}`)
  };


  return (
    // 필터 클릭시 드롭다운으로 나게
    <form
      className="searchBarWrap w-full flex flex-row border rounded-md  "
      onSubmit={handleSubmit}
    >
      {/* 셀렉트 드롭다운 배경색 수정필요 */}
      <select
        className="px-3 bg-inherit"
        onChange={(e) => setFtValue(e.target.value)}
        name="searchBarFilter"
        id="searchBarFilter"
      >
        <option value="title">제목</option>
        <option value="artist">작가</option>
      </select>
      <input
        className="pl-2 bg-glass bg-no-repeat bg-right text-black"
        type="text"
        placeholder="내용을 입력해주세요"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <button type="submit"> </button>
      {/* 돋보기 아이콘  */}
    </form>
  );
};

export default SearchBar;
