"use client";
import { useEffect, useState } from "react";
// 클라이언트 컴포넌트 ?
import filterList from "./filterlist";
import { IBookFilterProps } from "@/types/types";

const BookFilter: React.FC<IBookFilterProps> = (props) => {
  const {
    filterCheck,
    setFilterCheck,
    bookFilter,
    setBookFilter,
    selectedBookFilter,
    setSelectedBookFilter,
  } = props.filterState;
  const categoryList = filterList[0].category;
  const handleFilterClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const selectedValue = e.currentTarget.getAttribute("value");
    if (selectedValue && !filterCheck ) {
      setSelectedBookFilter(selectedValue);
      setFilterCheck(true);
    } else if (filterCheck) {
      e.currentTarget.blur();
    }
  };

  // 버튼이 포커스해제될때 필터체크를 false로
  const handleFilterBlur = () => {
    setFilterCheck(false);
    console.log('blur filter',filterCheck);
  };
  useEffect(() => {
    setBookFilter(selectedBookFilter);
  }, [selectedBookFilter]);

  return (
    <ul className="archiveFilterWrap sticky top-16 my-2 flex flex-row overflow-x-scroll overflow-y-hidden items-center scrollbar-hide justify-between ">
      {Object.values(categoryList).map((category) => (
        <button
          key={category.mainGenreCd}
          // click focus 사용이유 블로그에 적기
          onClick={handleFilterClick}
          // onFocus={handleFIlterFocus}
          onBlur={handleFilterBlur}
          value={category.mainGenreCdNm}
          className="archiveFilterInner flex shrink-0 px-2 py-1 mx-1 border rounded-md bg-white focus:bg-black focus:text-white "
        >
          {category.mainGenreCdNm}
        </button>
      ))}
    </ul>
  );
};

export default BookFilter;
