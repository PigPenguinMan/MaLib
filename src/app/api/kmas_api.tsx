
// 'https://www.kmas.or.kr/openapi/search/rgDtaMasterList'
// '1efb2da70d936bb190d6a62d1097f47a';

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

 export async function getMainData() {
  
  const res = await fetch(
    `https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=${apiKey}`,{
        method:'GET',
        mode:'cors'
    }
  
  );
  if (!res.ok) {
    throw new Error("api data 불러오기 실패");
  }
  const data = await res.json();
  console.log(data);
  
  return data
}
