import { NextResponse } from "next/server";
async function fetchData( ) {
  const apiKey = "1efb2da70d936bb190d6a62d1097f47a";
  const viewItemCnt = 100;
  try {
    const response = await fetch(
      `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&pageNo=${pageNo}`,
      {}
    );
    if (!response.ok) {
      throw new Error(`http error ,${response.status} `);
    }
    const data = await response.json();
    console.log("패치성공");
    return data;
  } catch (err) {
    console.error(err, "패치에러");
  }
}


export async function GET(requset: Request) {
  try {
    const data = await fetchData();
    // const { searchParams } = new URL(requset.url)
    // console.log(requset.url);
    // const pageNo = searchParams.get('query')
    return (
      NextResponse.json({ message: "GET METHOD", success: true }),
      NextResponse.json(data)
    );
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}

// export async function GET(res: Response, req: Request) {
//   const apiKey = "1efb2da70d936bb190d6a62d1097f47a";
//   const viewItemCnt = 100;
//   try {
//     const response = await fetch(
//       `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&pageNo=1`,{
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`http error, ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("패치성공");
//     return NextResponse.json({ message: "GET METHOD", success: true }, NextResponse.json(data));
//   } catch (err) {
//     console.error(err, "패치에러");
//     return NextResponse.json({ message: err, success: false });
//   }
// }


export async function POST(res: Response, req: Request) {
  return NextResponse.json({ message: "POST METHOD", success: true });
}
export async function PUT(res: Response, req: Request) {
  return NextResponse.json({ message: "DELETE METHOD", success: true });
}
export async function DELETE(res: Response, req: Request) {
  return NextResponse.json({ message: "PUT METHOD", success: true });
}
