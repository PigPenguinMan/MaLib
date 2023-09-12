"use client";

import { getMainData } from "@/app/api/kmas_api";
import { useEffect, useState } from "react";

const ArchiveList = () => {
  const [data, setData] = useState();
//   09/12 api를 불러올때 CORS 문제 발생
//   useEffect(() => {
//     const fetchData = () => {
//       try {
//         const apiData =  getMainData();
//         console.log(apiData, "apiData");
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

  return <div>{data ? <div>데이터들어옴</div> : <div> 안들어옴</div>}</div>;
};

export default ArchiveList;
