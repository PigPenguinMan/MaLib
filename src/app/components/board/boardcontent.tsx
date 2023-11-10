import { IBoardContent } from "@/types/types";

const BoardContent = (props : IBoardContent) => {
    // console.log(props)
    return ( 
        <div className="board_inner flex flex-col w-full h-full  rounded-md p-2 border bg-Green/97 gap-y-3 min-h-[400px]">
            <div className="board_user_wrap flex gap-2 items-center pb-2 border-b">
                <div className="board_user_img"><img src="/userImage.svg" alt="유저이미지" /></div>
                <div className="board_user_name text-xl">{props.userName}</div>
            </div>
            <div className="board_contents flex flex-col min-h-[75%]">
                {/* <div className="board_content_img"></div> */}
                <div className="board_content_text">{props.contentText}</div>
            </div>
            <div className="board_footer flex border-t">
                {/* like로 변경 필요 */}
                <div className="board_heart">{props.heart}</div>
                <div className="board_reply">{props.reply}</div>
            </div>
        </div>
     );
}
 
export default BoardContent;