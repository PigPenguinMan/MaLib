"use client";

import BookFilter from "@/app/utils/bookfilter";
import Content from "@/app/utils/content";
import Loading from "@/app/utils/loading";

import { IBookData, IItem } from "@/types/types";
import { Suspense, useEffect, useState } from "react";
import debounce from "lodash/debounce";

const Archive = () => {
  const [contentData, setContentData] = useState<IItem[]>([]);
  const [moreData, setMoreData] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/book`, {
        method: "GET",
      });
      if (!response.ok) throw new Error(`error:${response.statusText}`);
      const bookData = await response.json();
      // 09/20
      // 데이터 들어왔을대 필터해서 set시키기
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const filterData = (bookData.data.itemList as IItem[]).filter((item,index,self)=>{
        return self.findIndex((t)=> t.prdctNm === item.prdctNm) === index
      })
      setContentData(filterData);
      setLoading(false);
    } catch (err) {
      console.error(err, "fetchData");
    }
  };
  const fetchNextData = async () => {
    setFetching(true);
    try {
      const response = await fetch(`/api/book`, {
        method: "GET",
      });
      if (!response.ok)
        throw new Error(`Error 'fetchNextData'  ${response.statusText}`);
      const bookData = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const filterData  = (bookData.data.itemList as IItem[]).filter((item,index,self)=>{
        return self.findIndex((t) => t.prdctNm === item.prdctNm) === index
      })
      setMoreData(filterData);
      setContentData(prevData => [...prevData ,...filterData])
      console.log("다음데이터 패치");

    } catch (err) {
      console.log(err, "fetchNextData");
    }
    setFetching(false);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      debounce(() => {
        fetchNextData();
      }, 500)();
    }
  };
  // api로 불러온 데이터중 같은 이름끼리 안나오게 필터
  const filteredData = contentData.filter((item, index, self) => {
    return self.findIndex((t) => t.prdctNm === item.prdctNm) === index;
  });

  //   09/12 api를 불러올때 CORS 문제 발생 ---- 09/14해결
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="ArchiveWrap w-full px-28 flex flex-col grow  ">
      {/* 장르별 필터  */}
      <div className="filterWrap sticky top-16 w-full h-full bg-slate-500 z-[99] ">
        <BookFilter />
      </div>
      <div className="ContentListWrap grid grid-cols-6 gap-2 justify-items-center">
        {loading ? (
          <p>Loading</p>
        ) : contentData.length > 0 ? (
          contentData.map((itemList) => (
            // 09/17 prop 출판사만 다르고 같은이름의 데이터들이 있는 문제 -- 
            <Content
              key={parseInt(itemList.mastrId)}
              // 객체의 모드속성을 전개연산자{...}를 사용해 prop내려주기 
              {...itemList}
              
            
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
