import BoardNav from "../components/board/boardnav"

export default function BoardLayout ({
    children,
} : {
    children : React.ReactNode
}){
    return <section className="mx-28 my-2 h-screen">
        <BoardNav/>
        {children}
        </section>
}