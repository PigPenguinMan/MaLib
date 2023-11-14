import clientPromise from "@/lib/database"
import { NextResponse } from "next/server";




export async function GET(requset:Request,response :Response) {
    try {
        const { searchParams } =new URL(requset.url);
        let pageNm ;
        if(searchParams.has('pageNm')){
            pageNm = Number(searchParams.get('pageNm'))*9;
        }
        const client = await clientPromise;
        const collection = client.db('Board').collection('Content');
        // mongoDB에서 limit와 skip으로 데이터가 9개 이상일때 페이지네이션
        
        const contents = await collection.find().skip(pageNm? pageNm : 0).limit(9).toArray();        
        return NextResponse.json({success:true , contents});
    } catch (err) {
        console.error('Board GET API Error',err);
    }
    
}

export async function POST(requset:Request,response:Response) {
    try {
        const reqbody = await requset.json();
        const client = await clientPromise ;
        const collection = client.db('Board').collection('Content');
        let boardContents = {
            userImg : "", 
            userName : reqbody.user_name, 
            heart : 0, 
            reply : 0,
            contentText : reqbody.board_content_text , 
        }
        
        /** 11/12 write에서 보낸 req insertOne으로 컬렉션에 삽입 */
        // 11/14 객체 boardContents를 그대로 넣으면 객체자체가 DB에 삽입되 ...을 사용해 내용을 삽입
        await collection.insertOne({...boardContents})
        return (
            NextResponse.json({success:true ,boardContents:boardContents,message:'POST'})
        )
        
    } catch (err) {
        console.error('Board POST API Error',err);
        
    }
    
}

export async function DELETE(requset:Request) {
    try {
        /**  
         * 11/12 request의 ContentId와 같은 objectId를 가진 데이터를 findOneAndDelete으로 지우기 
         *  https://mongodb.github.io/node-mongodb-native/6.2/classes/Collection.html#findOneAndDelete
        */
        const client = await clientPromise ;
        const collection = client.db('Board').collection('Content');
    } catch (err) {
        console.error('Board DELETE API Error',err);
        
    }
    
}

export async function UPDATE(request:Request) {
    try {
        /**
         * 11/12 request의 ContentID와 같은 objectId를 가진 데이터를 findOneAndUpdate로 수정하기
         * https://mongodb.github.io/node-mongodb-native/6.2/classes/Collection.html#findOneAndUpdate
         */
    } catch (err) {
        console.error('Board UPDATE API err',err);
        
    }    
}