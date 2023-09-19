"use client";

import BookFilter from "@/app/utils/bookfilter";
import Content from "@/app/utils/content";
import Loading from "@/app/utils/loading";
import { BookData, Item } from "@/types/types";
import { Suspense, useEffect, useState } from "react";
const Archive = () => {
  const [contentData, setContentData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetch,setIsFetch] = useState(false)
  let dataPageNo = 1 ;
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/book`, {
        method: "GET"
      });
      if (!response.ok) throw new Error(`error:${response.statusText}`);
      const bookData = (await response.json()) as BookData;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setContentData(bookData.itemList as Item[]);
      setLoading(false);
      dataPageNo++
    } catch (err) {
      console.error(err,'fetchData');
    }
  };
  const fetchNextData = async ()=>{
    try {
      const response = await fetch(`/api/book?pageNo?query=${dataPageNo}`,{
        method:"GET"
      })
      if(!response.ok) throw new Error(`Error 'fetchNextData'  ${response.statusText}`)
      const bookData = (await response.json()) as BookData
      setContentData(prevData => [...prevData, ...bookData.itemList ])
      setIsFetch(true)
    } catch(err){
      console.log(err,'fetchNextData');
    }
  }
  const handleScroll = ()=>{
    const scrollY = window.scrollY ; 
    const windowHeight = window.innerHeight ; 
    const contentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= contentHeight - 200){
      fetchNextData()
    }
  }
  // api로 불러온 데이터중 같은 이름끼리 안나오게 필터
  const filteredData = contentData.filter((item, index, self) => {
    return self.findIndex((t) => t.prdctNm === item.prdctNm) === index;
  });


  console.log(filteredData);

  //   09/12 api를 불러올때 CORS 문제 발생 ---- 09/14해결
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return()=>{
      window.removeEventListener('scroll',handleScroll)
      setIsFetch(false)
    }
  },[])
  return (
    <div className="ArchiveWrap w-full px-28 flex flex-col grow  ">
      {/* 장르별 필터  */}
      <div className="filterWrap sticky top-16 w-full h-full bg-slate-500 z-[99] ">
        <BookFilter />
      </div>
      <div className="ContentListWrap grid grid-cols-6 gap-2 justify-items-center">
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
    </div>
  );
};

export default Archive;
