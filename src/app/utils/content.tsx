import { BookProps } from "@/types/types";

const Content  = ( { mastrId , title , listSeCd , mainGenreCdNm  ,imageDownloadUrl} :BookProps ) => {
    return ( 
        <div className="w-full min-h-[300px] innerContent" >
            <a href="">
                <div className="relative  w-full h-full  rounded-lg  ">
                    <img className="absolute w-full h-full top-0 left-0 object-cover select-none" src={`${imageDownloadUrl}`} alt={`${title}`} />

                </div>
            </a>
        </div>
     );
}
 
export default Content;