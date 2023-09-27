import { IItem, ISearchItem } from "@/types/types";
import Link from "next/link";

export function ArchiveContent(props: IItem) {
  // url로 데이터 전달하기 위한 queryString
  const params = new URLSearchParams();
  for (const key of Object.keys(props) as (keyof IItem)[]) {
    const value = props[key];
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  const queryString = params.toString();

  return (
    <div className="innerContent w-full min-h-[300px]">
      <Link
        href={{
          pathname: `/archive/${props.isbn}`,
          query: queryString,
        }}
      >
        <div className="relative  w-full h-full  rounded-lg  ">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover select-none"
            src={`${props.imageDownloadUrl}`}
            alt={`${props.title}`}
          />
        </div>
      </Link>
    </div>
  );
}

// 리턴부분의 pathName만 다른데 저부분만 수정하면 함수1개로 가능? 할거같음

export function ResultContent(props: ISearchItem) {
  const params = new URLSearchParams();
  for (const key of Object.keys(props) as (keyof ISearchItem)[]) {
    const value = props[key];
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  const queryString = params.toString();

  return (
    <div className="innerContent w-full min-h-[300px] inner">
      <Link
        href={{
          pathname: `/search/${props.isbn}`,
          query: queryString,
        }}
      >
        <div className="relative w-full h-full rounded-lg">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover select-none"
            src={`${props.imageDownloadUrl}`}
            alt={`${props.title}`}
          />
        </div>
      </Link>
    </div>
  );
}
