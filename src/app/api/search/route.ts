// 검색창에서 검색햇을때 사용할 API
// 09/25 검색창에서 제목 , 작가 , 장르를 골랐을때 fetchSearch에서 제목 , 작가 로 필터되어 검색하는 기능 필요

import { NextResponse } from "next/server";

async function fetchSearch(ftValue: string, searchValue: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiURL = process.env.NEXT_PUBLIC_API_SEARCH_URL;
  const viewItemCnt = 100;
  try {
    const response = await fetch(
      `${apiURL}?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&${ftValue}=${searchValue}`,
      {}
    );
    if (!response.ok) {
      throw new Error(`http error , ${response.statusText}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.error(err, "패치에러");
  }
}

export async function GET(requset: Request) {
  try {
    const { searchParams } = new URL(requset.url);
    let ftValue;
    let searchValue;
    if (searchParams) {
      if (searchParams.has("title")) {
        ftValue = "title";
        searchValue = searchParams.get(ftValue);
      } else if (searchParams.has("artist")) {
        ftValue = "artist";
        searchValue = searchParams.get(ftValue);
      }
    }
    ftValue = ftValue || "default";
    console.log(ftValue, "ft");
    searchValue = searchValue || "default";
    console.log(searchValue, "sear");
    const data = await fetchSearch(ftValue, searchValue);
    return NextResponse.json({ message: "GET METHOD", success: true, data });
  } catch (err) {
    console.error(err, "패치에러");
  }
}
export async function POST(res: Response, req: Request) {
  return NextResponse.json({ message: "POST METHOD", success: true });
}
export async function PUT(res: Response, req: Request) {
  return NextResponse.json({ message: "DELETE METHOD", success: true });
}
export async function DELETE(res: Response, req: Request) {
  return NextResponse.json({ message: "PUT METHOD", success: true });
}
