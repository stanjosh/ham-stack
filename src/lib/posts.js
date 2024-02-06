
import { Posts } from "./mongodb"
import { ObjectId } from "mongodb"


export const getPosts = async (req, res) => {
    return await (await Posts()).find({}).sort({"createdAt": -1}).toArray()
}

export const createPost = async ({content, username}) => {
    const record = await (await Posts()).insertOne({ 
        content, 
        username,
        likes: [],
        createdAt: new Date(), 
    });
    return record
}

export const getPost = async (id) => {
    return await (await Posts()).findOne({ _id: id })
}

export const handleLikePost = async (id, username) => {
    const record = await (await Posts()).findOne({ _id: new ObjectId(id) })
    if (record && record.likes?.includes(username)) {
        record.likes = record.likes.filter((like) => like !== username)
    } else if (record && !record.likes) {
        record.likes = [username]
    } else {
        record.likes.push(username)
    }
    await (await Posts()).updateOne({ _id: new ObjectId(id) }, { $set: { likes: record.likes } })
    

    return record
}



export const getLikes = async (id) => {
    const record = await (await Posts()).findOne({ _id: id })
    return record.likes
}

