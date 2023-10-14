import clientPromise from "@/lib/database";
import { ISigninRequsetBody } from "@/types/types";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(requset:Request) {
    try {
        const body : ISigninRequsetBody = await requset.json();
        const client = await clientPromise;
        const userCollection = client.db(process.env.MONGODB_DB_NAME).collection('User');
        // 로그인에 쓴 이메일을 DB에 있는지 체크 
        const user = await userCollection.findOne({Email:body.Email});
        // console.log('user APi',user);
        if(user && (await bcrypt.compare(body.Password , user.Password))){
        // 비밀번호가 맞을때 홈페이지로 이동
            return NextResponse.json({success:true , user})
        }   else {
            return NextResponse.json({success:false})
        }

    } catch (err) {
        console.error('signin API Err',err);
    }
}