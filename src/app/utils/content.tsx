import { IItem } from "@/types/types";
import Link from "next/link";

const Content = (props: IItem) => {
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
    <div className="w-full min-h-[300px] innerContent">
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
};

export default Content;
