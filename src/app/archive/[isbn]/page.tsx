import { IItem } from "@/types/types";

export default function BookDetailPage ({params , searchParams} :{ params : {isbn : string} , searchParams : IItem}){

    

    return <div className="detail_wrap flex-col">
        <div className="detail_top flex ">
            <div className="img_wrap">
                <img src={searchParams.imageDownloadUrl} alt="cover image" />
            </div>
        </div>
        <div className="detail_md">

        </div>
        <div className="detail_btm">

        </div>
    </div>
}