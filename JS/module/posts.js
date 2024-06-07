import { getUser } from "./users";

const validateGetPost = async ({ postId}) => {
    if (typeof postId !== "number" || postId === undefined) return { status: 406, message: `The post id is missing or does not comply with the required format` };
};

export const getAllPost = async(arg) => {
    let val = await validateGetPost(arg);
    if(val) return val;
    let res = await fetch(`http://172.16.101.146:5800/post/${arg.postId}`);
    if(res.status === 404) return { status: 204, message: `Post do not exist`};
    let data = await res.json();
    return data;
};

const validateAddPost = async ({ userId, title, body }) => {
    if(typeof userId !== "number" || userId === undefined) return { status: 406, message: `The user id is missing or does not comply with the required format` };
    if(typeof title !== "string" || title === undefined) return { status: 406, message: `The title is missing or does not comply with the reqired format` };
    if(typeof body !== "string" || body === undefined) return { status: 406, message: `The body is missing or does not comply with the required format` };
    let user = await getUser ({userId});
    if(user.status == 204) return { status: 200, message: `The user to search does not exist`};
};

export const addPost = async(arg) => {
    let val = await validateAddPost(arg);
    if(val) return val;
    let config = {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5800/post`, config);
    let data = await res.json();
    return data;
};

const validateDeletePost = async ({id}) => {
    if(typeof id !== "number" || id === undefined) return { status: 406, message: `The post id does not meet the required format` };
};

export const deletePost = async(arg) => {
    let val = await validateDeletePost(arg);
    if(val) return val;
    let config = {
        method: "DELETE",
        headers: {"Content-Type": "application/json" }
    };
    let res = await fetch(`http://172.16.101.146:5800/post/${arg.id}`, config);
    if(res.status === 404) return {status: 406, message: `The post you want to delete is not registered` };
    let data = await res.json();
    data.status = 202;
    data.message = `The post ${arg.id} was deleted from the databas`;
    return data;
};

const validateUpdatePost = async ({ postId, userId, title, body }) => {
    if(typeof postId !== "number" || postId === undefined) return {status: 406, message: `The post id is missing or does not comply with the required format` };
    if(typeof userId !== "number" || userId === undefined) return {status: 406, message: `The user id is missing or does not comply with thw required format` };
    if(typeof title !== "string" || title === undefined) return {status: 406, message: `The title is missing or does not comply with the required format `};
    if(typeof body !== "string" || body === undefined) return {status: 406, message: `The body is missing or does not comply with the required format `};
};

export const updatePost = async(arg) => {
    let val = await validateUpdatePost(arg);
    if(val) return val;
    let config = {
        method: "PUT",
        headers: {"Content-type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5800/post/${arg.postId}`, config);
    if (res.status === 404)
        return {status: 204, message: `Post does not exist` };
    let data = await res.json();
    return data;
};