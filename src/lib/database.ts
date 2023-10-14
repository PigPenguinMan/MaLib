/**
 *ref https://www.mongodb.com/docs/atlas/tutorial/insert-data-into-your-cluster/
 *https://reacthustle.com/blog/how-to-implement-mongodb-authentication-in-nextjs-nextauthjs
 */

import { MongoClient, MongoClientOptions } from "mongodb";

const uri =
  "mongodb+srv://HUISEONG:tiger6090!@malib.ngkor5v.mongodb.net/?retryWrites=true&w=majority";
const url = process.env.MONGODB_URI;
const options: MongoClientOptions = {};
let client;
let clientPromise: Promise<MongoClient>;
if (!url) {
  throw new Error(`ENV.NEXT_MONGODB_URI not found`);
}
const devCheck = process.env.NODE_ENV === "development";
if (devCheck) {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri,options);
  clientPromise = client.connect();
}

export default clientPromise;

