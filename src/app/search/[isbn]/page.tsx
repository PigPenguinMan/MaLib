// 검색결과 페이지 

const SearchReusltPage = ({params}:{params : {isbn :string}}) => {
    return ( 
        <div>
            검색결과 페이지 : {params.isbn}
        </div>
     );
}
 
export default SearchReusltPage;