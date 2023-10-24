import UserPageNavbar from "@/app/components/usernavbar/usernavbar";

export default function userPageLayout ({children}:{children:React.ReactNode}){
    return(
        <div className="user_wrap flex w-full h-full  py-12 px-28  ">
            <div className="user_layout_nav w-1/5 border-2">
                <UserPageNavbar/>
            </div>
            <div className="user_layout_page w-4/5 border-2">
                {children}
            </div>
        </div>
    )
}