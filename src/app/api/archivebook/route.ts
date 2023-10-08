import { NextResponse } from "next/server";


async function fetchData(pageNo : string |null , pageNo2 :string|null ) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const apiURL = process.env.NEXT_PUBLIC_API_ARCHIVE_URL
  const viewItemCnt = 50;
  try {
    const [response1,response2] = await Promise.all([
      fetch(
        `${apiURL}?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&listSeCd=${2}&&pageNo=${pageNo}`,{}
      ),
      fetch(
        `${apiURL}?prvKey=${apiKey}&viewItemCnt=${viewItemCnt}&listSeCd=${2}&&pageNo=${pageNo2}`,{}
      )
    ])
    if (!response1.ok) 
      throw new Error(`http error res1 ,${response1.status} `);
    if (!response2.ok)
      throw new Error(`http error res2,${response2.status}`)
    const [data1,data2] = await Promise.all([response1.json(),response2.json()])
    console.log("패치성공")
    const data = [data1,data2]
    return data
  } catch (err) {
    console.error(err, "패치에러");
  }
}

export async function GET(requset: Request) {
  try {
    const { searchParams } = new URL(requset.url)
    let pageNo ; 
    let pageNo2 ;    
    if(searchParams.has('pageNo')){
      pageNo = searchParams.get('pageNo')
    } else {
       pageNo = null
    }
    if(searchParams.has('pageNo2')){
      pageNo2 = searchParams.get('pageNo2')
    } else {
      pageNo2 = null
    }
    const data = await fetchData(pageNo,pageNo2);
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
