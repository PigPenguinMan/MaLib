import { IItem, ISearchItem } from "@/types/types";
import Link from "next/link";

// 데이터에 해당하는 작가 글,그림작가가 있을때 있는 작가만 표시
function dispArtist(pictrWritrNm: string | null, sntncWritrNm: string | null) {
  if (pictrWritrNm && sntncWritrNm) {
    pictrWritrNm === sntncWritrNm;
    return pictrWritrNm;
  } else if (pictrWritrNm) {
    return pictrWritrNm;
  } else if (sntncWritrNm) {
    return sntncWritrNm;
  }
}
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
    <div className="innerContent  w-full min-h-[300px] rounded-md pb-10 px-2 ">
      <Link
        href={{
          pathname: `/archive/${itemList.isbn}`,
          query: queryString,
        }}
      >
        <div className="relative  w-full h-full rounded-md   ">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover select-none rounded-md"
            src={`${itemList.imageDownloadUrl}`}
            alt={`${itemList.title}`}
          />
        </div>
        <div className="relative flex flex-col items-start ">
          <span className="text-sm line-clamp-1 opacity-75">
            {itemList.prdctNm}
          </span>
          <span className="text-xs opacity-50">
            {dispArtist(itemList.pictrWritrNm, itemList.sntncWritrNm)}
          </span>
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
    <div className="innerContent w-full min-h-[300px] rounded-md pb-10 px-2  ">
      <Link
        href={{
          pathname: `/archive/${itemList.isbn}`,
          query: queryString,
        }}
      >
        <div className="relative w-full h-full rounded-md">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover select-none rounded-md"
            src={`${itemList.imageDownloadUrl}`}
            alt={`${itemList.prdctNm}`}
          />
        </div>
        <div className="relative flex flex-col items-start ">
          <span className="text-sm line-clamp-1 opacity-75">
            {itemList.prdctNm}
          </span>
          <span className="text-xs opacity-50">
            {dispArtist(itemList.pictrWritrNm, itemList.sntncWritrNm)}
          </span>
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
    <div className="archiveContent flex flex-col w-full min-h-[200px] overflow-hidden">
      <Link
        href={{
          pathname: `/search/${itemList.isbn}`,
          query: queryString,
        }}
      >
        <div className="relative w-full h-56 ">
          <img
            src={`${itemList.imageDownloadUrl}`}
            alt={`${itemList.prdctNm}`}
            className="relative w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="relative flex flex-col items-start ">
          <span className="text-sm line-clamp-1 opacity-75 pt-2">
            {itemList.prdctNm}
          </span>
        </div>
      </Link>
    </div>
  );
}
