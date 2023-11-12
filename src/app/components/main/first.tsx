const MainFirst = () => {
  return (
    <div className="main_first relative flex justify-center w-full h-[600px] bg-DarkGreen/25/90">
      <div className="main_fl w-1/4 flex flex-col items-center justify-evenly h-[600px]  bg-Green/97/20 text-Green/97 ">
        <p className="main_fl_title text-7xl">MaLib ?</p>
        <p className="main_fl_desc px-5 text-lg ">
          MaLib은 만화규장각 OPEN API를 이용한 웹으로
          <br />
          만화,웹툰의 데이터를 받아와 만화를 찾고 검색하거나
          <br />
          그에 관한 글을 작성할 수 있는 게시판이 있습니다.
        </p>
      </div>
      <div className="main_fr w-1/6 flex flex-col items-center justify-around mx-28 text-Green/97">
        <div className="main_fr_logo text-3xl">로 고 위 치</div>
        <div className="main_fr_btnwrap flex justify-around w-full pt-12">
          <button className="main_fr_arbtn text-2lg p-2 rounded-md border border-Green/97 hover:bg-Green/97 hover:text-DarkGreen/25/90">
            아카이브로 이동
          </button>
          <button className="main_fr_bobtn text-2lg p-2 rounded-md border border-Green/97 hover:bg-Green/97 hover:text-DarkGreen/25/90">
            게시판으로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainFirst;
