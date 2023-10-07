import { IItem, ISearchItem } from "@/types/types";
import Link from "next/link";


export function ArchiveContent(itemList: IItem) {
const params = new URLSearchParams();
  // url로 데이터 전달하기 위한 queryString
  for (const key of Object.keys(itemList) as (keyof IItem)[]) {
    const value = itemList[key];
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  const queryString = params.toString();

  return (
    <div className="innerContent w-full min-h-[300px]">
      <Link
        href={{
          pathname: `/archive/${itemList.isbn}`,
          query: queryString,
        }}
      >
        <div className="relative  w-full h-full  rounded-lg  ">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover select-none"
            src={`${itemList.imageDownloadUrl}`}
            alt={`${itemList.title}`}
          />
        </div>
      </Link>
    </div>
  );
}

// 리턴부분의 pathName만 다른데 저부분만 수정하면 함수1개로 가능? 할거같음

export function ResultContent(itemList: ISearchItem) {
const params = new URLSearchParams();

  for (const key of Object.keys(itemList) as (keyof ISearchItem)[]) {
    const value = itemList[key];
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  const queryString = params.toString();

  return (
    <div className="innerContent w-full min-h-[300px] ">
      <Link
        href={{
          pathname: `/search/${itemList.isbn}`,
          query: queryString,
        }}
      >
        <div className="relative w-full h-full rounded-lg">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover select-none"
            src={`${itemList.imageDownloadUrl}`}
            alt={`${itemList.prdctNm}`}
          />
        </div>
      </Link>
    </div>
  );
}

export function ArchiveInfoContent(itemList: ISearchItem) {
const params = new URLSearchParams();

  for (const key of Object.keys(itemList) as (keyof ISearchItem)[]) {
    const value = itemList[key];
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  const queryString = params.toString();

  return (
    <div className="archiveContent w-full min-h-[200px]">
      <Link
        href={{
          pathname: `/search/${itemList.isbn}`,
          query: queryString,
        }}
      >
        <div className=" relative w-full h-full rounded-lg">
          <img
            src={`${itemList.imageDownloadUrl}`}
            alt={`${itemList.prdctNm}`}
          />
        </div>
      </Link>
    </div>
  );
}
