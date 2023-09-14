// 'https://www.kmas.or.kr/openapi/search/rgDtaMasterList'
// '1efb2da70d936bb190d6a62d1097f47a';

import { NextApiRequest, NextApiResponse } from "next";

// api 호출 URL , 키
// api 호출할시 RequestInit에 request에 필요한 파라미터 추가

type CustomRequestInit = RequestInit & {
  params?: {
    prvKey: String;
    listSeCd?: String | undefined;
    // 1  :  웹툰
    // 2  :  도서(만화책)
    // 3  :  잡지
    // 4  :  영화
    // 5  :  드라마
    // 6  :  게임
    // 7  :  공연,전시
    // 8  :  행사(전시,행사,축제,컨퍼런스,공모전)
    // 9  :  상품
    pageNo?: String;
    // default  = 1
    viewItemCnt?: String;
    // min = 10 , max = 100
    startDate?: String;
    endDate?: String;
    // yyyy-mm-dd
  };
};

const requestOption: CustomRequestInit = {
  method: "GET",
  // params: {
  //   prvKey: '1efb2da70d936bb190d6a62d1097f47a',
  //   pageNo: "1",
  //   viewItemCnt: "100",
  // },

  cache: "force-cache",
};

const apiKey = "1efb2da70d936bb190d6a62d1097f47a";

// 처음에 api로 불러올 만화목록 데이터

//  export async function getMainData() {
//   const response = await fetch(
//     `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}`,
//   );
//   if (!response.ok) {
//     throw new Error("api data 불러오기 실패");
//   }
//   const data = await response.json();
//   console.log(data);

//   return data
// }

// export default async function handler() {
//   try {
//     const response = await fetch( `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}`)
//     const data = response.json()

//     return data
//   } catch (err){
//     console.error(err)
//   }

// }
// const bookDataFetch = async () => {
//   const res = await fetch(
//     `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}`
//   );
//   if (!res.ok) {
//     console.error(res.statusText);
//   }
//   console.log(res);

//   return res.json();
// };

export async function dataFetch(res: NextApiResponse, req: NextApiRequest) {
  try {
    const response = await fetch(
      `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`http error ,${res.status} `);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err, "패치에러");
    res.status(500).json({ error: "internal server error" });
  }
}
