"use client";

import BookFilter from "@/app/utils/bookfilter";
import { useEffect, useState } from "react";
const ArchiveList = () => {
  const apiKey = "1efb2da70d936bb190d6a62d1097f47a";
  const [data, setData] = useState();
  const apiCall = async () => {
    try {
      const response = await fetch(`/api/book`, {
        method: "GET"
      });
      if (!response.ok) throw new Error(`error:${response.statusText}`);
      const bookData = await response.json(); 
      setData(bookData)
    } catch (err) {
      console.error(err);
    }
  };
  //   09/12 api를 불러올때 CORS 문제 발생
  useEffect(() => {
    apiCall();
  }, []);

  return <div className="ArchiveListWrap w-full px-28 flex flex-col grow border-2 border-black ">
    {data ? 
  <>
      {/* 장르별 필터  */}
      <BookFilter/>
      {/* 책하나에 해당하는 컴포넌트  */}
  </>

  :
   <div>데이터 불러오기 실패</div> }</div>;
};

export default ArchiveList;

// const fetchData = async () => {
//   const response = await fetch(
//     `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}`,
//     {
//       method: "GET",
//       mode: "cors",
//       credentials:'include',
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",

//       },
//     }
//   );
//   if (!response.ok) {
//     console.error(`http error, ${response.status}`);
//   }
// };
// fetchData();
