import clientPromise from "@/lib/database"
import { NextResponse } from "next/server";




export async function GET(requset:Request,response :Response) {
    try {
        const client = await clientPromise;
        const Collection = client.db('Board').collection('Content');
        const contents = await Collection.find().limit(9).toArray();
        
        return NextResponse.json({success:true , contents})

    } catch (err) {
        console.error('Board GET API Error',err)
    }
    
}

export async function POST(requset:Request,response:Response) {
    try {
        const client = await clientPromise ;
        const Collection = client.db('Board').collection('Content');

        
    } catch (err) {
        console.error('Board POST API Error',err);
        
    }
    
}