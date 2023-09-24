export default function BookPage ({params} : {params :{mastrId : string}}){
   
    return <div>
        상세페이지  : {params.mastrId}
        
    </div>
}