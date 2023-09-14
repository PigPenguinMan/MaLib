"use client";

import { useEffect, useState } from "react";

const ArchiveList = () => {
  const apiKey = "1efb2da70d936bb190d6a62d1097f47a";
  const [data, setData] = useState();
  const apiCall = async () => {
    try {
      const response = await fetch(`/api/book`, {
        method: "GET",
        headers:{
          'Access-Control-Allow-origin' : '*'
        }
      });
      if (!response.ok) throw new Error(`error:${response.statusText}`);
      const data = await response.json(); 
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  //   09/12 api를 불러올때 CORS 문제 발생
  useEffect(() => {
    apiCall();
  }, []);

  return <div>{data ? <div>데이터들어옴</div> : <div> 안들어옴</div>}</div>;
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
