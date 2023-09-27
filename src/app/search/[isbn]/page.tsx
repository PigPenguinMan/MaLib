// 검색결과 페이지 

import { ISearchItem } from "@/types/types";

const ReusltContentPage = ({params} : {params : ISearchItem}) => {
    return ( 
        <div>
            검색결과 페이지 : {params.isbn}
        </div>
     );
}
 
export default ReusltContentPage;