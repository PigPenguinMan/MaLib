'use client'

import { useState } from "react";

// 네브바에 사용할 검색창
// 필터 ( 제목 , 작가이름 , 장르 ) , 입력창 , 돋보기아이콘 

const SearchBar = () => {
    // 내용 입력후 검색할 함수 필요
    const [ftValue,setFtValue] = useState("")
    const [searchValue,setSearchValue] = useState("")
    return ( 
        // 필터 클릭시 드롭바 형태로 나오게 함 
        <div className="searchBarWrap w-full flex flex-row divide-x-2 divide-solid border-2 ">
            <select className="px-1 mx-2 bg-inherit" name="searchBarFilter" id="searchBarFilter">
                <option value="제목">제목</option>
                <option value="artist">작가</option>
                <option value="장르">장르</option>
            </select>
            
            <input className="pl-2" type="text" placeholder="내용을 입력해주세요" onChange={(e)=>setSearchValue(e.target.value)} value={searchValue}/>
            {/* 돋보기 아이콘  */}
        </div>
     );
    }
    
    export default SearchBar;
    // const option = [
    //     {value:'제목'},
    //     {value:'작가'},
    //     {value:'장르'}
    // ]