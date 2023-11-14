"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const BoardNav = () => {
    const router = useRouter();
  return (
    <div className="board_nav flex justify-between items-center p-2 rounded-lg ">
      {/* 글머리? 를 만들면 글머리로 필터링 */}
      <div className="board_nav_filter flex gap-3 text-lg">
        <button className="rounded-md border">필터1</button>
        <button className="rounded-md border">필터2</button>
        <button className="rounded-md border">필터3</button>
      </div>
      <div className="board_nav_btn">
        <button onClick={()=>router.push('/board/write')} className="rounded-md border hover:border-slate-100">
          <Image src="/write.svg" alt="글쓰기 이미지" width={28} height={28} />
        </button>
      </div>
    </div>
  );
};

export default BoardNav;
