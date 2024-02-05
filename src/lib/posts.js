import { Posts } from "./mongodb"
import { getServerSession } from 'auth-astro/server'


export const getPosts = async (req, res) => {
    return await (await Posts()).find({}).sort({"createdAt": -1}).toArray()
}

export const createPost = async ({title, content}) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    console.log(session)

    const record = await (await Posts()).insertOne({ 
        title, 
        content, 
        createdAt: new Date(), 
        

    });
    return {id: record.insertedId, ...{title, content}}
}

export const getPost = async (id) => {
    return await (await Posts()).findOne({ _id: id })
}



