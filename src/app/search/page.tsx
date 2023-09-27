"use client";
// 검색결과 페이지
import { Suspense, useEffect, useState } from "react";
import BookFilter from "../utils/bookfilter";
import Loading from "../utils/loading";
import { useSearchParams } from "next/navigation";
import { ISearchItem } from "@/types/types";
import { ResultContent } from "../utils/content";

const SearchResultPage = () => {
  const [resultData, setResultData] = useState<ISearchItem[]>([]);
  const params = useSearchParams();

  const searchResultData = async () => {
    try {
      let ftValue;
      let searchValue;
      params.forEach((value, key) => ((searchValue = value), (ftValue = key)));
      const response = await fetch(`/api/search?${ftValue}=${searchValue}`, {
        method: "GET",
      });
      if (!response.ok)
        throw new Error(`searchFetchErr:${response.statusText}`);
      const searchData = await response.json();
      const filterdData = (searchData.data.itemList as ISearchItem[]).filter(
        (item, index, self) => {
          return self.findIndex((t) => t.prdctNm === item.prdctNm) === index;
        }
      );
      setResultData(filterdData);
    } catch (err) {
      console.error(err, "fetchErr");
    }
  };
  useEffect(() => {
    searchResultData();
  }, []);
  return (
    <div className="SearchResultWrap w-full px-28 flex flex-col grow">
      <div className="filterWrap sticky top-16 w-full h-full z-[99]">
        <BookFilter />
      </div>
      <div className="ContentListWrap grid grid-cols-6 gap-2 justify-items-center">
        <Suspense fallback={<Loading />}>
          {resultData.map((itemList) => (
            <ResultContent key={itemList.isbn} {...itemList} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default SearchResultPage;
