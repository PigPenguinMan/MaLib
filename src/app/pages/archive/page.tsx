// 아카이브 페이지 
// 만화필터 ( 한국만화 , 일본만화 , 웹툰 , 장르별)
// 만화 목록 ( display - grid , 화면크기에 따라 Row,Col 변경)

import ArchiveList from "@/app/components/archive/archive";



const ArchiveMain = () => {

    return ( 
        <div className="Archive_Main h-screen border-2 ">
            <ArchiveList/>
        </div>
     );
}
 
export default ArchiveMain;
