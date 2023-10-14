"use client";
// 검색결과 페이지
import { Suspense, useEffect, useState } from "react";
import BookFilter from "../utils/bookfilter";
import Loading from "../utils/loading";
import { useSearchParams } from "next/navigation";
import { IBookFilterProps, ISearchItem } from "@/types/types";
import { ResultContent } from "../utils/content";

const SearchResultPage = () => {
  const [resultData, setResultData] = useState<ISearchItem[]>([]);
  const [filterCheck, setFilterCheck] = useState<boolean>(false);
  const [filterData, setFilterdData] = useState<ISearchItem[]>([]);
  const [bookFilter, setBookFilter] =
    useState<IBookFilterProps["filterState"]["bookFilter"]>("");
  const [selectedBookFilter, setSelectedBookFilter] =
    useState<IBookFilterProps["filterState"]["selectedBookFilter"]>("");
  const params = useSearchParams();
  const searchResultData = async () => {
    try {
      let ftValue;
      let searchValue;
      let searchData;
      params.forEach((value, key) => ((searchValue = value), (ftValue = key)));
      const response = await fetch(`/api/search?${ftValue}=${searchValue}`, {
        method: "GET",
      });
      if (!response.ok)
        throw new Error(`searchFetchErr:${response.statusText}`);
      const data = await response.json();
      if (ftValue === "artist") {
        const searchData1 = data.data[0].itemList as ISearchItem[];
        const searchData2 = data.data[0].itemList as ISearchItem[];
        searchData = [...searchData1, ...searchData2];
      } else {
        searchData = data.data.itemList as ISearchItem[];
      }

      const filterdData = searchData.filter((item, index, self) => {
        return self.findIndex((i) => i.prdctNm === item.prdctNm) === index;
      });
      setResultData(filterdData);
    } catch (err) {
      console.error(err, "fetchErr");
    }
  };
  // 데이터 필터에 따라 표시하는 함수
  const handleFilterChange = () => {
    const filterData = resultData.filter(
      (item) => item.mainGenreCdNm === selectedBookFilter
    );
    setFilterdData(filterData);
  };
  useEffect(() => {
    searchResultData();
  }, []);
  useEffect(() => {
    handleFilterChange();
  }, [selectedBookFilter]);
  return (
    <div className="SearchResultWrap w-full px-28 flex flex-col grow">
      <div className="filterWrap sticky top-16 w-full h-full bg-white z-[99]">
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
      <div className="ContentListWrap grid grid-cols-6 gap-x-3 py-2  justify-items-center bg-slate-100 mx-2">
        <Suspense fallback={<Loading />}>
          {filterCheck && filterData
            ? filterData.map((itemList: ISearchItem) => (
                <ResultContent key={itemList.isbn} {...itemList} />
              ))
            : resultData.map((itemList: ISearchItem) => (
                <ResultContent key={itemList.isbn} {...itemList} />
              ))}
        </Suspense>
      </div>
    </div>
  );
};

export default SearchResultPage;
