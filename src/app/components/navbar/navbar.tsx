const NavBar = () => {
    return ( 
        <nav>
            {/* 로고 아이콘 */}
            {/* 메뉴 1~3 */}
            <ul>
                <li>아카이브</li>
                <li>게시판</li>
                <li>만화 성향찾기</li>
            </ul>
            {/* 검색창  */}
            <div> 검색창 </div>
            {/* 로그인 회원가입 로그아웃 버튼 */}
            <div> 로그인버튼</div>
        </nav>
     );
}
 
export default NavBar;
// 필요한 기능 
// 로고 , 메뉴1~3 , 검색창 , 로그인 , 회원가입 , 로그아웃 
// Position - sticky 상단고정 ( 헤더에 할지 네브바에 할지)