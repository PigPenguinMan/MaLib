import BoardNav from "../components/board/boardnav"

export default function BoardLayout ({
    children,
} : {
    children : React.ReactNode
}){
    return <div className="board_layout mx-28 my-2  h-full min-h-screen">
        <BoardNav/>
        {children}
        </div>
}