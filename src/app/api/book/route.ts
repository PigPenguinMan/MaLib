import { NextResponse } from "next/server";

export async function GET(res: Response, req: Request) {
  const apiKey = "1efb2da70d936bb190d6a62d1097f47a";
  const viewItemCnt = 6
    try {
      const response = await fetch(
        `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&listSeCd=1`,{
          
        }
      );
      if (!response.ok) {
        throw new Error(`http error ,${response.status} `);
      }
      const data = await response.json();
      console.log( "패치성공");
      return (
        NextResponse.json({ message:"GET METHOD",success : true}),
        NextResponse.json(data)
      )
    } catch (err) {
      console.error(err, "패치에러");
      return NextResponse.json({message:err , success : false});
    }
}
export async function POST(res: Response, req: Request) {
  return NextResponse.json({ message: "POST METHOD" ,success : true});
}
export async function PUT(res: Response, req: Request) {
  return NextResponse.json({ message: "DELETE METHOD",success : true });
}
export async function DELETE(res: Response, req: Request) {
  return NextResponse.json({ message: "PUT METHOD" ,success : true });
}
