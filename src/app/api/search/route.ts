// 검색창에서 검색햇을때 사용할 API
// 09/25 검색창에서 제목 , 작가 , 장르를 골랐을때 fetchSearch에서 제목 , 작가 로 필터되어 검색하는 기능 필요

import { NextResponse } from "next/server";

async function fetchSearch(ftValue: string, searchValue: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiURL = process.env.NEXT_PUBLIC_API_SEARCH_URL;
  const viewItemCnt = 100;
  const commonUrl = `${apiURL}?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&`
   try {
      if( ftValue === 'artist'){
        const [response1,response2] = await Promise.all([
          fetch(`${commonUrl}pictrWritrNm=${searchValue}`,{}),
          fetch(`${commonUrl}sntncWritrNm=${searchValue}`,{})
        ])
        if(!response1.ok)
        throw new Error (`hhtp error resp1 , ${response1.status}`)
        if(!response2.ok)
        throw new Error (`http error resp2 , ${response2.status}`)
        const [data1 , data2] = await Promise.all([response1.json(),response2.json()])
        console.log('작가검색 패치성공');
        const data = [data1,data2]
        return data
        
      } else { 
        const response = await fetch(
          `${apiURL}?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&${ftValue}=${searchValue}`,
          {}
        );
        console.log('제목검색  패치성공');
        
        const data =response.json();
          return data
      }
   } catch (err) {
    console.error(err,'패치에러');
    
   }
}

export async function GET(requset: Request) {
  try {
    const { searchParams } = new URL(requset.url);
    let ftValue;
    let searchValue;
    searchParams.forEach(
      (value, key) => ((searchValue = value), (ftValue = key))
    );
    // default말고 다른방법으로 해결방법찾기
    ftValue = ftValue || "default";
    searchValue = searchValue || "default";

    const data = await fetchSearch(ftValue, searchValue);
    return NextResponse.json({ message: "GET METHOD", success: true, data });
  } catch (err) {
    console.error(err, "패치에러");
  }
}
export async function POST() {
  return NextResponse.json({ message: "POST METHOD", success: true });
}
export async function PUT() {
  return NextResponse.json({ message: "DELETE METHOD", success: true });
}
export async function DELETE() {
  return NextResponse.json({ message: "PUT METHOD", success: true });
}
