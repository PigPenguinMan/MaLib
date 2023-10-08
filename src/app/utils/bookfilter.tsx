"use client";
import { useEffect, useState } from "react";
// 클라이언트 컴포넌트 ?
import filterList from "./filterlist";
import { IBookFilterProps } from "@/types/types";

const BookFilter: React.FC<IBookFilterProps> = (props) => {
  const {
    bookFilter,
    setBookFilter,
    selectedBookFilter,
    setSelectedBookFilter,
  } = props.filterState;
  const categoryList = filterList[0].category;
  const handleFilterClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // 포커스됐을때 색깔 토글
    e.currentTarget.classList.toggle("focus:bg-black");
    e.currentTarget.classList.toggle("focus:text-white");
    const selectedValue = e.currentTarget.getAttribute("value");
    if (selectedValue) {
      setSelectedBookFilter(selectedValue);
    }
  };
  useEffect(() => {
    setBookFilter(selectedBookFilter);
    console.log(selectedBookFilter, "sbookfilter");
  }, [selectedBookFilter]);

  return (
    <ul className="archiveFilterWrap sticky top-16 my-2 flex flex-row overflow-x-scroll overflow-y-hidden items-center scrollbar-hide justify-between ">
      {Object.values(categoryList).map((category) => (
        <button
          key={category.mainGenreCd}
          onClick={handleFilterClick}
          value={category.mainGenreCdNm}
          className="archiveFilterInner flex shrink-0 px-2 py-1 mx-1 border rounded-md  bg-white  "
        >
          {category.mainGenreCdNm}
        </button>
      ))}
    </ul>
  );
};

export default BookFilter;
