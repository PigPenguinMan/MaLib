export default function BookPage ({params} : {params :{isbn : string}}){
   
    return <div>
        상세페이지  : {params.isbn}
        
    </div>
}