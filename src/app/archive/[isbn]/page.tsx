"use client";
import { IItem } from "@/types/types";
import React, { useState } from "react";

export default function BookDetailPage({
  params,
  searchParams,
}: {
  params: { isbn: string };
  searchParams: IItem;
}) {
  // console.log(searchParams);
  const [outlineMore, setOutlineMore] = useState<boolean>(false);
  // 더보기 버튼을 눌렀을때 펼쳐지는 함수
  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(outlineMore);
    const parent = e.currentTarget.parentElement;
    parent?.classList.toggle("max-h-40");
    e.currentTarget.classList.toggle("bg-gradient-to-t");
    !setOutlineMore;
  };

  return (
    <div className="detail_wrap flex flex-col grow w-full px-28 ">
      <div className="detail_top flex mt-6 gap-2  h-full w-full">
        <div className="img_container relative basis-1/3 h-full w-80 rounded-xl ">
          <div className="img_bg_wrap absolute h-full w-full object-cove overflow-hidden rounded-xl bg-[#000000]/30">
            <img
              src={searchParams.imageDownloadUrl}
              alt="cover_image_bg"
              className="img_Bg top-0 left-0 h-full w-full object-cover object-center blur-[12px] "
            />
            {/* 10/03 gradiant 적용안됌 수정필요 */}
            {/* gradient-to-t top에서 아래로 */}
            <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[rgba(247,247,247)] via-[rgba(247,247,247,0.7),rgba(247,247,247,0.4)] to-[rgba(247,247,247,0.00)]"></div>
          </div>
          <div className="img_wrap relative h-full mt-7 min-h-[inherit]">
            <div className="relative mx-auto w-52 z-10">
              <img
                src={searchParams.imageDownloadUrl}
                alt="cover_image"
                className="img  top-0 left-0 h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="relative flex flex-col px-5 mt-7 text-center">
            {/*  line-clamp https://tailwindcss.com/docs/line-clamp */}
            <span className=" mb-3 text-2xl line-clamp-1">
              {searchParams.prdctNm}
            </span>
            <span className=" mb-2 text-sm text-ellipsis opacity-60">
              {searchParams.pictrWritrNm}
            </span>
            <div className="relative flex mb-2 items-center justify-center gap-2 text-sm opacity-70">
              <div className=" h-4">
                <img
                  src="/book.svg"
                  alt="book SVG"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>{searchParams.listSeCdNm}</div>
              <div>{searchParams.ageGradCdNm}</div>
              <div>{searchParams.orginlNationCdNm}</div>
            </div>
            <span className="mb-6 text-sm opacity-70">
              {searchParams.fnshYn === "Y" ? "연재" : "완결"}
            </span>
          </div>
        </div>
        <div className="desc_container relative flex flex-col basis-2/3 gap-3 rounded-xl">
          <div className="desc_top relative w-full p-6  rounded-xl bg-slate-100 ">
            <div className="text-2xl mb-5">정보</div>
            <div className="info_wrap flex gap-10 text-sm ">
              <ul className=" opacity-50">
                {searchParams.pictrWritrNm ? <li>그림</li> : null}
                {searchParams.sntncWritrNm ? <li>글</li> : null}
                <li>분류</li>
                {searchParams.plscmpnIdNm ? <li>출판사</li> : null}
                <li>원작 국가</li>
                <li>연령 등급</li>
              </ul>
              <ul className=" opacity-90">
                {searchParams.pictrWritrNm ? (
                  <li>{searchParams.pictrWritrNm}</li>
                ) : null}
                {searchParams.sntncWritrNm ? (
                  <li>{searchParams.sntncWritrNm}</li>
                ) : null}
                <li>
                  {searchParams.listSeCdNm} | {searchParams.mainGenreCdNm}
                </li>
                {searchParams.plscmpnIdNm ? (
                  <li>{searchParams.plscmpnIdNm}</li>
                ) : null}
                <li>{searchParams.orginlNationCdNm}</li>
                <li>{searchParams.ageGradCdNm}</li>
              </ul>
            </div>
          </div>
          <div className="desc_mid relative flex flex-col w-full p-6 rounded-xl bg-slate-100">
            <div className="desc_outline_title text-2xl mb-5">줄거리</div>
            {/* 10/03 outline 정규표현식으로 마침표마다 줄바꿈처리필요  
                 <span> {(searchParams.outline).replace(/\.(?=[^\r\n])/ig,'.\r\n')}</span> 
                 ----
                 .으로 split한 다음 map으로 처리
                {searchParams.outline.split(".").map((sent, index, array) => (
                // line-clamp-6로 6줄까지만 표시하고 그 이후는 ... 처리
                <React.Fragment key={index}>
                  {/* outline문단을 .으로 나누고 문장의 마지막에 마침표를 다시 찍음 }
                  {sent.trim()}
                  {index < array.length - 1 && "."}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
               */}
            <div className="desc_outline_wrap flex w-full felx-col overflow-hidden max-h-40">
              <span className="desc_outline relative text-sm opacity-90 break-words whitespace-pre-wrap ">
                {" "}
                {/* 10/06 화이트스페이스처리 , 6줄이상일시 더보기 클릭하면 다볼수있게 늘리기 */}
                {searchParams.outline}
              </span>
              <div
                onClick={handleClickMore}
                className="outline_bg absolute flex flex-col-reverse bottom-0 left-0 h-1/2 w-full cursor-pointer bg-gradient-to-t from-[rgba(247,247,247)] via-[rgba(247,247,247,0.7),rgba(247,247,247,0.4)] to-[rgba(247,247,247,0.00)]"
              >
                <div className="arrow_image  flex justify-center items-center pb-2">
                  {outlineMore ? (
                    <img
                      src="/lessarrow.svg"
                      alt="줄이기아이콘"
                      className="h-3 w-full"
                    />
                  ) : (
                    <img
                      src="/morearrow.svg"
                      alt="더보기아이콘"
                      className="h-3 w-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail_md">{/* 같은작가 작품표시 */}</div>
      <div className="detail_btm"></div>
    </div>
  );
}
