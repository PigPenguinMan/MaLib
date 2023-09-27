"use client";

import { ISearchItem } from "@/types/types";
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
    // try {
    //   const response = await fetch(`/api/search?${ftValue}=${searchValue}`, {
    //     method: "GET",
    //   });
    //   if (!response.ok)
    //     throw new Error(`searchFetchErr:${response.statusText}`);
    //   const searchData = await response.json();
    //   const filterdData = (searchData.data.itemList as ISearchItem[]).filter(
    //     (item, index, self) => {
    //       return self.findIndex((t) => t.prdctNm === item.prdctNm) === index;
    //     }
    //   );
    // //   console.log(filterdData as ISearchItem[]);
    // } catch (err) {
    //   console.error(err, "fetchErr");
    // }
  };
  return (
    // 필터 클릭시 드롭바 형태로 나오게 함
    <form
      className="searchBarWrap w-full flex flex-row divide-x-2 divide-solid border-2 "
      onSubmit={handleSubmit}
    >
      <select
        className="px-1 mx-2 bg-inherit"
        onChange={(e) => setFtValue(e.target.value)}
        name="searchBarFilter"
        id="searchBarFilter"
      >
        <option value="title">제목</option>
        <option value="artist">작가</option>
      </select>
      <input
        className="pl-2"
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
