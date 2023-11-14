// 아카이브 페이지
// 만화필터 ( 한국만화 , 일본만화 , 웹툰 , 장르별)
// 만화 목록 ( display - grid , 화면크기에 따라 Row,Col 변경)

import Archive from "@/app/components/archive/page";
import React, { Suspense } from "react";
import Loading from "../components/loading";
const ArchiveMain = () => {
  return (
    <div className="Archive_Main ">
      <Suspense fallback={<Loading/>}>
        <Archive />
      </Suspense>
    </div>
  );
};

export default ArchiveMain;
