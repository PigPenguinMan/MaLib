import clientPromise from "@/lib/database"
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"

export async function GET() {
    const client = await clientPromise;
    const users = client.db(process.env.MONGODB_DB_NAME).collection('User');
    const password = bcrypt.hashSync("password",10);
    await users.insertOne({
        name : "test",
        password: password,
        role: 'admin'
    })
    return NextResponse.json({success:true})
}