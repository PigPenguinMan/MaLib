const BoardNav = () => {

    const filterList = [
       
    ]
    return ( 
        // 필터? 글쓰기 버튼 
        <div className="board_nav flex content-end ">
            <div className="board_nav_filter"></div>
            <div className="board_nav_btn"> 
            <button> <img src="/write.svg" alt="글쓰기 아이콘" /></button>
            </div>
        </div>
     );
}
 
export default BoardNav;