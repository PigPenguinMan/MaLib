import UserPageNavbar from "@/app/components/usernavbar/usernavbar";

export default function userPageLayout ({children}:{children:React.ReactNode}){
    return(
        <div className="user_wrap flex w-full h-full  py-12 px-28 gap-2  ">
            <div className="user_layout_nav w-1/5 bg-slate-100 rounded-lg">
                <UserPageNavbar/>
            </div>
            <div className="user_layout_page w-4/5 bg-slate-100 rounded-lg ">
                {children}
            </div>
        </div>
    )
}