import { NextResponse } from "next/server";

async function fetchData(
  pictrWritrNm: string | null,
  sntncWritrNm: string | null
) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiURL = process.env.NEXT_PUBLIC_API_SEARCH_URL;
  try {
    const response = await fetch(
      `${apiURL}?prvKey=${apiKey}&${
        pictrWritrNm != null ? `pictrWritrNm=${pictrWritrNm}&` : ``
      }${sntncWritrNm != null ? `sntncWritrNm=${sntncWritrNm}` : ``}`,
      {}
    );
    if (!response.ok) throw new Error(`http error, ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err, "인포데이터 패치에러");
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    let pictrWritrNm;
    let sntncWritrNm;
    if (searchParams.has("pictrWritrNm")) {
      pictrWritrNm = searchParams.get("pictrWritrNm");
    } else {
      pictrWritrNm = null;
    }
    if (searchParams.has("sntncWritrNm")) {
      sntncWritrNm = searchParams.get("sntncWritrNm");
    } else {
      sntncWritrNm = null;
    }

    const data = await fetchData(pictrWritrNm, sntncWritrNm);

    await new Promise((resolve) => setTimeout(resolve, 100));
    return NextResponse.json({ message: "GET METHOD", success: true, data });
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "POST METHOD", success: true });
}
export async function PUT(request: Request) {
  return NextResponse.json({ message: "PUT METHOD", success: true });
}
export async function DELETE(request: Request) {
  return NextResponse.json({ message: "DElETE METHOD", success: true });
}
