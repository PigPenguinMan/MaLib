//  ref https://codingapple.com/forums/topic/nextjs-typescript-mongodb-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%EA%B3%B5%EB%B6%80%ED%95%98%EA%B3%A0-%EC%9E%88%EB%8A%94%EB%8D%B0%EC%9A%94%E3%85%A0%E3%85%A0/

import { MongoClient } from "mongodb";
export {};
declare global{
    let _MONGO:Promise<MongoClient> | undefined 
}