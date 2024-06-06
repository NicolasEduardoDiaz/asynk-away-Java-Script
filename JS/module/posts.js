import { getUser } from "./users.js"
const validateaAddPost = async({userId, title, body}) =>{
    if(typeof userId !== "number" || userId === undefined) return { status: 406, message: ``};
    if(typeof title !== "string" || title === undefined) return {status: 406, message:``};
    if(typeof body !== "string" || body === undefined) return {status: 406, message: ``};
    let user = await (getUser({userId}));
    if(user.status == 204) return {status: 200, message: `The user to search does not exist`};
};

export const addPost = async arg => {
    let val = await validateaAddPost (arg);
    if(val) return val;
    const config = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg);
    }
    let res = await fetch("https://jsonplaceholeder.typicode.com/posts", config);
    let data = await res.json();
    return data;
};