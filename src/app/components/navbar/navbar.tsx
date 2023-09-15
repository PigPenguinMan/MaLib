import SearchBar from "./searchbar";


const NavBar = () => {
  return (
    // 작업완료후 class border-2 삭제
    <div className="flex flex-row items-center justify-between h-16 p-6 border-2 ">
      <h1 className="border-2">
        <a href="">로고</a>
      </h1>
      {/* 로고 아이콘 */}
      {/* 메뉴 1~3 */}
      <nav>
        <ul className="flex flex-row border-2">
          <li>
            <a className="py-3 px-6" href="">
              아카이브
            </a>
          </li>
          <li>
            <a className="py-3 px-6" href="">
              게시판
            </a>
          </li>
          <li>
            <a className="py-3 px-6" href="">
              만화 성향찾기
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-row basis-2/3 justify-end">
        {/* 검색창 */}
        
        <div className="searchbar px-22 mx-6 "> <SearchBar/> </div>
        {/* 로그인 회원가입 | 로그아웃 버튼 컴포넌트화시키기 */}
        <ul className="flex flex-row mx-6 ">
          <li className="login mx-2 border-2">로그인</li>
          <li className="signup mx-2 border-2">회원가입</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
// 필요한 기능
// 로고 , 메뉴1~3 , 검색창 , 로그인 , 회원가입 , 로그아웃
// Position - sticky 상단고정 ( 헤더에 할지 네브바에 할지)
