import { getPosts, createPost } from '../../lib/posts'

export const get = async () => {
    const posts = await getPosts();
    if (!posts) {
       return new Response(null, { 
        status: 404,
        statusText: 'Not Found'});
    };

    return new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export const post = async ({ request }) => {
    const body = await request.json();
    const post = await createPost(body);
    return new Response(JSON.stringify(post), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}