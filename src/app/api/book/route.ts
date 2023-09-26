import { NextResponse } from "next/server";

// pageNo  받아와 쓰기
let pageNo = 1 ;
async function fetchData( ) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const apiURL = process.env.NEXT_PUBLIC_API_ARCHIVE_URL
  const viewItemCnt = 100;
  try {
    const response = await fetch(
      `${apiURL}?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&listSeCd=${2}&&pageNo=${pageNo}`,
      {}
    );
    if (!response.ok) 
      throw new Error(`http error ,${response.status} `);
    
    const data = await response.json();
    console.log("패치성공");
    pageNo += 100 ;
    return data;
  } catch (err) {
    console.error(err, "패치에러");
  }
}

export async function GET(requset: Request) {
  try {
    const data = await fetchData();
    await new Promise((resolve)=>setTimeout(resolve,100))
    return (
      NextResponse.json({ message: "GET METHOD", success: true ,data }))

  } catch (err) {
    return NextResponse.json({ message: err, success: false });
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
