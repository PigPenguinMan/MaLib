import clientPromise from "@/lib/database";
import { ISigninRequsetBody } from "@/types/types";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(requset: Request) {
  try {
    const body: ISigninRequsetBody = await requset.json();
    const client = await clientPromise;
    const userCollection = client
      .db(process.env.MONGODB_DB_NAME)
      .collection("User");
    // 로그인에 쓴 계정이 DB에 있는지 체크
    const user = await userCollection.findOne({
      AccountName: body.AccountName,
    });
    if (user) {
      const checkValidPW = await bcrypt.compare(body.Password, user?.Password);
      // 비밀번호가 틀렸을때 메세지
      if (!checkValidPW) {
        return NextResponse.json({
          success: false,
          message: "signin API Password Invalid",
          code: "3",
        });
      } else {
        // 계정과 비밀번호가 둘 다 맞을때 메세지
        return NextResponse.json(user);
      }
    } else {
      // 입력한계정이 데이터베이스에 없을때 메세지
      return NextResponse.json({
        success: false,
        message: "signin API AccountName Invalid",
        code: "2",
      });
    }
  } catch (err) {
    console.error("signin API Err", err);
  }
}
