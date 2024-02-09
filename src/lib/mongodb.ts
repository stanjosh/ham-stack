
import { MongoClient } from "mongodb";

if (!import.meta.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = import.meta.env.MONGODB_URI;
const options = {};


let cachedMongo;


export const getDB = async () => {
  if (import.meta.env.NODE_ENV === "development") {

    if (!global._mongoConnection) {
      global._mongoConnection = await connectToDB();
      cachedMongo = global._mongoConnection;
    }
    return cachedMongo;
  }
  const mongo = await connectToDB();
  return mongo;
};


export const connectToDB = async () => {
  const mongo = await new MongoClient(uri, options).connect();
  return mongo.db(import.meta.env.MONGODB_DB);
};

export const clientPromise = await await new MongoClient(uri, options).connect();

export const Posts = async () => {
  const db = await getDB();
  return await db.collection("posts");
}