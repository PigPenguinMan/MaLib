"use client";

import BookFilter from "@/app/utils/bookfilter";
import throttle from "lodash/throttle";
import { IBookFilterProps, IItem } from "@/types/types";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import Loading from "@/app/utils/loading";
// import { ArchiveContent } from "@/app/utils/content";

const ArchiveContent = React.lazy(() =>
  import("@/app/utils/content").then((module) => ({
    default: module.ArchiveContent,
  }))
);
const Archive = () => {
  const [contentData, setContentData] = useState<IItem[]>([]);
  const [moreData, setMoreData] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false);
  // 북필터에서 사용할 state
  const [filterCheck, setFilterCheck] = useState<boolean>(false);
  const [filterData, setFilterdData] = useState<IItem[]>([]);
  const [bookFilter, setBookFilter] =
    useState<IBookFilterProps["filterState"]["bookFilter"]>("");
  const [selectedBookFilter, setSelectedBookFilter] =
    useState<IBookFilterProps["filterState"]["selectedBookFilter"]>("");
  let pageNo = 1;
  let pageNo2 = 1500;
  // 데이터 패치에 필요한 함수들

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/archivebook?pageNo=${pageNo}&pageNo2=${pageNo2}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) throw new Error(`error:${response.statusText}`);
      const responseData = await response.json();
      const bookData1 = responseData.data[0].itemList as IItem[];
      const bookData2 = responseData.data[1].itemList as IItem[];
      const bookData = [...bookData1, ...bookData2];
      // 데이터 들어왔을대 필터해서 set시키기
      const filterData = bookData.filter((item, index, self) => {
        return self.findIndex((t) => t.prdctNm === item.prdctNm) === index;
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      pageNo += 50;
      pageNo2 += 50;
      setContentData(filterData);
      setLoading(false);
    } catch (err) {
      console.error(err, "fetchData");
    }
  };
  const fetchNextData = async () => {
    setFetching(true);
    try {
      const response = await fetch(
        `/api/archivebook?pageNo=${pageNo}&pageNo2=${pageNo2}`,
        {
          method: "GET",
        }
      );
      if (!response.ok)
        throw new Error(`Error 'fetchNextData'  ${response.statusText}`);
      const responseData = await response.json();
      const bookData1 = responseData.data[0].itemList as IItem[];
      const bookData2 = responseData.data[1].itemList as IItem[];
      const bookData = [...bookData1, ...bookData2];
      const filterData = bookData.filter((item, index, self) => {
        return self.findIndex((t) => t.prdctNm === item.prdctNm) === index;
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMoreData(filterData);
      setContentData((prevData) => [...prevData, ...filterData]);
      console.log("다음데이터 패치");
      pageNo += 50;
      pageNo2 += 50;
    } catch (err) {
      console.log(err, "fetchNextData");
    }
    setFetching(false);
  };
  // 데이터 필터에 따라 표시하는 함수
  const handleFilterChange = () => {
    const filterData = contentData.filter(
      (item) => item.mainGenreCdNm === selectedBookFilter
    );
    setFilterdData(filterData);
  };
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      // 10/08 debounce가 아닌 throttle로 수정
      throttle(() => fetchNextData(), 200)();
    }
  };
  //   09/12 api를 불러올때 CORS 문제 발생 ---- 09/14해결
  useEffect(() => {
    fetchData();
  }, []);
  // 스크롤 위치에 따라 이벤트 발생
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    handleFilterChange();
  }, [selectedBookFilter]);
  return (
    <div className="archivewrap w-full px-28 flex flex-col grow ">
      {/* 장르별 필터  */}
      <div className="filterwrap sticky top-16 w-full h-full  z-[99] bg-white ">
        <BookFilter
          filterState={{
            filterCheck,
            setFilterCheck,
            bookFilter,
            setBookFilter,
            selectedBookFilter,
            setSelectedBookFilter,
          }}
        />
      </div>
      {/* 10/10 필터를 눌러서 데이터가 바뀔때 바뀌는 애니매이션 ? 있어야 할거같음  */}
      <Suspense fallback={<Loading />}>
        <div className="contentlistwrap grid grid-cols-6 gap-x-3 py-3 justify-items-center bg-slate-100 rounded-lg mx-2">
          {
            // 09/17 prop 출판사만 다르고 같은이름의 데이터들이 있는 문제 --
            /*
             *10/03 필터를 눌렀을때 누른 필터와 같은장르만 남기기위해 필터state를 prop으로 내려줄때
             *itemList이 IItem 형식에 없지만 'IArchiveContentProps' 형식에서 필수입니다.ts(2741) 오류
             */
            /*
             *10/05 Encountered two children with the same key, `2023109495`.
             *Keys should be unique so that components maintain their identity across updates.
             *Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version
             *오류 발생 고유한 키값이 아닌여서 발생한 문제인거같은데 mastrId는 자료고유Id값인데 왜 생기는건지 모르겠다
             */
            // 객체의 모드속성을 전개연산자{...}를 사용해 prop 보내기
          }
          {filterCheck && filterData
            ? filterData.map((itemList: IItem) => (
                <ArchiveContent key={itemList.mastrId} {...itemList} />
              ))
            : contentData.map((itemList: IItem) => (
                <ArchiveContent key={itemList.mastrId} {...itemList} />
              ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Archive;
