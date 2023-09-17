import { BookProps } from "@/types/types";

const Content  = ( { mastrId , title , listSeCd , mainGenreCdNm  ,imageDownloadUrl} :BookProps ) => {
    return ( 
        <div className="relative w-full h-full " >
            <a href="">
                <div></div>
                <img className="absolute object-cover select-none" src={`${imageDownloadUrl}`} alt={`${title}`} />
            </a>
        </div>
     );
}
 
export default Content;