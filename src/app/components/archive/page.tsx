"use client";

import BookFilter from "@/app/utils/bookfilter";
import Content from "@/app/utils/content";
import Loading from "@/app/utils/loading";
import { BookData, Item } from "@/types/types";
import { Suspense, useEffect, useState } from "react";
const Archive = () => {
  const [contentData, setContentData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const apiCall = async () => {
    try {
      const response = await fetch(`/api/book`, {
        method: "GET",
      });
      if (!response.ok) throw new Error(`error:${response.statusText}`);
      const bookData = (await response.json()) as BookData;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setContentData(bookData.itemList as Item[]);
      setLoading(false);
      console.log("contentData", contentData);
    } catch (err) {
      console.error(err);
    }
  };
  const filteredData = contentData.filter((item , index ,self) =>{
    return self.findIndex((t)=> t.title === item.title ) === index
  })
  //   09/12 api를 불러올때 CORS 문제 발생 ---- 09/14해결
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div className="ArchiveWrap w-full px-28 flex flex-col grow  ">
      {/* 장르별 필터  */}
      <BookFilter />
      <Suspense fallback={<Loading />}>
        <div className="ContentListWrap grid grid-cols-6 justify-items-center" >
          {loading ? (
            <p>Loading</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((itemList, index) => (
              // 09/17 prop 출판사만 다르고 같은이름의 데이터들이 있는 문제
              <Content
                key={index}
                mastrId={itemList.mastrId}
                title={itemList.title}
                listSeCd={itemList.listSeCd}
                mainGenreCd={itemList.mainGenreCd}
                mainGenreCdNm={itemList.mainGenreCdNm}
                imageDownloadUrl={itemList.imageDownloadUrl}
                pictrWritrNm={itemList.pictrWritrNm}
                sntncWritrNm={itemList.sntncWritrNm}
                orginlNationCd={itemList.orginlNationCd}
                orginlNationCdNm={itemList.orginlNationCdNm}
              />
            ))
          ) : (
            <p>데이터없음</p>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default Archive;
