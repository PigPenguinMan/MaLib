"use client";
import { ArchiveInfoContent } from "@/app/utils/content";
import Loading from "@/app/utils/loading";
import { IItem, ISearchItem } from "@/types/types";
import { useSearchParams } from "next/navigation";

import React, { Suspense, useEffect, useState } from "react";

export default function BookDetailPage({
  params,
  searchParams,
}: {
  params: { isbn: string };
  searchParams: IItem;
}) {
  const [outlineMore, setOutlineMore] = useState<boolean>(false);
  const [infoData, setInfoData] = useState<ISearchItem[]>([]);
  const [likedBook, setLikedBook] = useState(searchParams.isbn);
  const infoParams = useSearchParams();
  // 같은 작가의 작품 데이터 패치함수
  const fetchData = async () => {
    try {
      let pictrWritrNm;
      let sntncWritrNm;
      {
        /* 
        매개변수의 searchParams를 사용하려고했지만 이미 IItem으로 타입지정을 시켜 따로 useSearchParams를 사용
        그림작가와 글작가가 따로이거나 없을경우를 위해 있을때만 params에서 값을 획득 
        */
      }
      if (infoParams.has("pictrWritrNm")) {
        pictrWritrNm = infoParams.get("pictrWritrNm");
      } else {
        pictrWritrNm = null;
      }
      if (infoParams.has("sntncWritrNm")) {
        sntncWritrNm = infoParams.get("sntncWritrNm");
      } else {
        sntncWritrNm = null;
      }
      // params에서 있는값만 api라우트로 보내고 아니면 null 처리
      const response = await fetch(
        `/api/archiveInfo?${
          pictrWritrNm ? `pictrWritrNm=${pictrWritrNm}&` : null
        }
          ${sntncWritrNm ? `sntncWritrNm=${sntncWritrNm}` : null}`,
        {
          method: "GET",
        }
      );
      if (!response.ok)
        throw new Error(`fatch Error infoData:${response.statusText}`);
      const contentData = await response.json();
      // 이름이 중복되는 경우 하나씩만 나오게 처리
      const filterData = (contentData.data.itemList as ISearchItem[]).filter(
        (item, index, self) =>
          self.findIndex((i) => i.prdctNm === item.prdctNm) === index
      );
      setInfoData(filterData);
    } catch (err) {
      console.error(err, "infoFatchData");
    }
  };

  // 더보기 버튼을 눌렀을때 펼치거나 접는 함수
  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const parent = e.currentTarget.parentElement;
    parent?.classList.toggle("max-h-40");
    e.currentTarget.classList.toggle("bg-gradient-to-t");
    setOutlineMore(!outlineMore);
  };

  const handleClickHeart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const likedBook = searchParams.isbn;
    console.log("heart Click");
    setLikedBook(likedBook);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="detail_wrap flex flex-col flex-1 grow w-full px-28 ">
        <div className="detail_top flex pt-6 gap-2  ">
          <div className="img_container relative flex flex-col  ">
            <div className="img_top roudned-t-xl w-96 h-full bg-slate-100">
              <div className="relative w-full h-96">
                <div className="img_bg_wrap absolute h-full w-full object-cover overflow-hidden rounded-xl ">
                  <img
                    src={searchParams.imageDownloadUrl}
                    alt="cover_image_bg"
                    className="img_bg absolute top-0 left-0 h-full w-full object-cover object-center blur-md "
                  />
                  {/* 10/03 gradiant 적용안됌 수정필요----- 수정완료*/}
                  {/* gradient-to-t top에서 아래로 */}
                  <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[rgba(247,247,247)] from-10% via-[rgba(247,247,247,0.5),rgba(247,247,247,0.1)] via-70% to-[rgba(247,247,247,0)] to-80%"></div>
                </div>
                <div className="img_wrap relative h-full py-6 min-h-[inherit]">
                  <div className="relative mx-20 h-full overflow-hidden rounded-lg ">
                    <img
                      src={searchParams.imageDownloadUrl}
                      alt="thumbnail"
                      className="img absolute top-0 left-0 h-full w-full "
                    />
                  </div>
                </div>
                <div className="img_desc_wrap relative  px-5 mt-5">
                  <div className="img_desc flex flex-col items-center text-center">
                    {/*  line-clamp https://tailwindcss.com/docs/line-clamp */}
                    {/* 10/07 predctNm만 안보이는 문제발생 */}
                    <span className="mb-3 text-2xl line-clamp-2 break-words ">
                      {searchParams.prdctNm}
                    </span>
                    <span className="mb-2 text-sm text-ellipsis opacity-60">
                      {searchParams.pictrWritrNm}
                    </span>
                    <div className="relative flex mb-2 text-sm items-center justify-center gap-2 opacity-70">
                      <div className="h-4">
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
                    {/* 하트 클릭시 색상 또는 크기 변화 만들기 */}
                    <div className="w-7 h-7" onClick={handleClickHeart}>
                      <img
                        src="/heart.svg"
                        alt="heart svg"
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="img_bottom flex-1 items-center justify-center overflow-hidden rounded-b-xl bg-slate-100"></div>
          </div>
          <div className="desc_container relative flex flex-col flex-1 basis-2/3 gap-3 rounded-xl">
            <div className="desc_top relative w-full p-6  rounded-xl bg-slate-100 ">
              <div className="desc_info_title w-full px-5 overflow-hidden">
                <div className="text-2xl mb-5">정보</div>
              </div>
              <div className="info_wrap flex px-5 gap-10 text-sm ">
                <ul className=" opacity-50">
                  {searchParams.pictrWritrNm ? <li>그림</li> : null}
                  {searchParams.sntncWritrNm ? <li>글</li> : null}
                  <li>분류</li>
                  {searchParams.plscmpnIdNm ? <li>출판사</li> : null}
                  <li>원작 국가</li>
                  <li>연령 등급</li>
                </ul>
                <ul className=" opacity-50">
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
            <div className="desc_md relative flex flex-col w-full p-6 rounded-xl bg-slate-100">
              <div className="desc_outline_title w-full px-5 overflow-hidden">
                <div className="text-2xl h-12 line-clamp-1">줄거리</div>
              </div>

              {/* 10/03 outline 정규표현식으로 마침표마다 줄바꿈처리필요  
                 <span> {(searchParams.outline).replace(/\.(?=[^\r\n])/ig,'.\r\n')}</span> 
                 ----
                 .으로 split한 다음 map으로 처리
                {searchParams.outline.split(".").map((sent, index, array) => (
                  <React.Fragment key={index}>
                  {/* outline문단을 .으로 나누고 문장의 마지막에 마침표를 다시 찍음 }
                  {sent.trim()}
                  {index < array.length - 1 && "."}
                  {index < array.length - 1 && <br />}
                  </React.Fragment>
                  ))}
                  -----------
                  10/06 split, map을 안쓰고 css만으로 처리 
                  */}
              <div className="desc_outline_wrap relative flex flex-col w-full px-5  overflow-hidden max-h-40">
                <span className="desc_outline relative block text-sm opacity-90 break-words whitespace-pre-wrap ">
                  {/* 10/06 화이트스페이스처리 , 6줄이상일시 더보기 클릭하면 다볼수있게 늘리기 */}
                  {searchParams.outline}
                </span>
                {/* 줄거리 아랫쪽을 누르면 전체 내용을 보거나 , 전체 내용을 접을수 있게 */}
                <div
                  onClick={handleClickMore}
                  className="outline_bg absolute flex flex-col-reverse bottom-0 left-0 h-1/2 w-full cursor-pointer bg-gradient-to-t from-[rgba(241,245,249)] via-[rgba(241,245,249,0.7),rgba(241,245,249,0.4)] to-[rgba(241,245,249,0.00)]"
                >
                  <div className="arrow_image flex justify-center items-center pt-2">
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
            <div className="desc_bottom relative flex flex-col w-full h-min-[inherit] p-6 bg-slate-100 rounded-xl">
              <div className="text-2xl mb-5">작가의 다른작품</div>
              <div className="desc_artist grid grid-cols-5 px-5 gap-2 justify-items-center rounded-md">
              
                <Suspense fallback={<Loading />}>
                  {infoData.map((itemList) => (
                    <ArchiveInfoContent key={itemList.isbn} {...itemList} />
                  ))}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="detail_infoWrap relative flex w-full h-80 mt-6 bg-slate-100 rounded-xl"></div>
      </div>
    </Suspense>
  );
}
