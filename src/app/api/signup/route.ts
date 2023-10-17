// 회원가입에 사용할 api
import clientPromise from "@/lib/database";
import { ISignupRequestBody } from "@/types/types";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(requset: Request) {
  try {
    const body: ISignupRequestBody = await requset.json();
    console.log(body, "회원가입 api body");
    const client = await clientPromise;
    const userCollection = client
      .db(process.env.MONGODB_DB_NAME)
      .collection("User");
    const currentTime = new Date().toLocaleDateString();
    const handlerHashPw =  async (Pw: string) => {
      //  hash에 사용할 Salt 생성
      const saltFactor = 10;
      try {
        const salt = await bcrypt.genSalt(saltFactor);
        const hash = await bcrypt.hash(Pw, salt);
        return hash;
      } catch (err) {
        console.error("handlerHash err", err);
      }
    };
    // handlerHashPw가 비동기함수라 리턴값이 Promise로 감싸져있기때문에 await를 사용해 결과를 기다려야함
    const hashedPw = await handlerHashPw(body.Password)
    // 정규표현식으로 띄워쓰기를 다없애고 . 를 / 로 바꾼다음 마지막 슬래시만 제거
    const time = currentTime
      .replace(/\s+/g, "")
      .replace(/\./g, "/")
      .slice(0, -1);
    let userInfo = {
      AccountName: body.AccountName,
      Password: hashedPw,
      Name: body.Name,
      Role: "admin",
      Created_at: time,
      Updated_at: "",
      Profile_pic: "",
      IsAdult: body.IsAdult ? true : false ,
    };

    await userCollection.insertOne(userInfo)
    return NextResponse.json({ success: true, userInfo });
  } catch (err) {
    console.error("signUp API err", err);
  }
}
