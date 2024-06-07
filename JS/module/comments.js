const validateGetComments = async ({ commentId}) => {
    if(typeof commentId !== "number" || commentId === undefined) return { status: 406, message: `The comment id is missing or does not comply with the required format` };
};

export const getAllComments = async(arg) => {
    let val = await validateGetComments(arg);
    if (val) return val;
    let res = await fetch(`http://172.16.101.146:5801/comments/${arg.commentId}`);
    if(res.status === 404) return { status: 204, message: `Comment do no exist` };
    let data = await res.json();
    return data;
};

const validateAddComment = async({ postId, name, email, body }) => {
    if(typeof postId !== "number" || postId === undefined) return { status: 406, message: `The post id is missng or does not comply with the required format` };
    if(typeof name !== "string" || name === undefined) return { status: 406, message: `The name is missing or does comply with the required format` };
    if(typeof email !== "string" || email === undefined) return { status: 406, message: `The email is missing or does not comply with the required format` };
    if(typeof body !== "string" || body === undefined) return { status: 406, message: `The body is missing or does comply with the required format` };
};

export const addComment = async(arg) => {
    let val = await validateAddComment(arg);
    if(val) return val;
    let config = {
        method: "POST",
        headers: {"content-Type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5801/comments`, config)
    let data = await res.json();
    return data;
};

const validateDeleteComment = async({id}) => {
    if(typeof id !== "number" || id === undefined) return {status: 406, message: `The comment id odes not meet the required format` };
};

export const deleteComment = async(arg) => {
    let val = await validateDeleteComment(arg);
    if(val) return val;
    let config = {
        method: "DELETE",
        headers: {"Content-Type": "application/json" }
    };
    let res = await fetch(`http://172.16.101.146:5801/comments/${arg.id}`, config);
    if(res.status === 404) return {status: 204, message: ` The comment you want to delete is not registred` };
    let data = await res.json();
    data.status = 202;
    data.message = `The comment ${arg.id} was delete from the database`;
    return data;
};

const validateUpdateComment = async({ commentId, postId, name, email, body }) =>{
    if(typeof commentId !== "number" || commentId === undefined) return {status: 406, message: `The comment id is missing or does omply with the required format` };
    if(typeof postId !== "number" || postId === undefined) return { status: 406, message: `The post id is missing or does comply with the required format` };
    if(typeof name !== "string" || name === undefined) return {status: 406, message: `The name is missng or does comply with the required format` };
    if(typeof email !== "string" || email === undefined) return {status: 406, message: `The email is missing or does cumply with the required format` };
    if(typeof body !== "string" || body === undefined) return {status: 406, message: `The body is missing or does cumply with the required format` };
};

export const updateComment = async(arg) => {
    let val = await validateUpdateComment(arg);
    if(val) return val;
    let config = {
        method: "PUT",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5801/comments/${arg.commentId}`, config);
    if(res.status === 404)
        return{status: 20, message: `Comment does not exist` };
    let data = await res.json();
    return data;
};