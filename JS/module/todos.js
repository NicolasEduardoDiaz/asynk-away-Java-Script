import { getUser } from "./users";

const validateGetTodos = async({ todoId }) => {
    if(typeof todoId !== "number" || todoId === undefined) return {status: 406, message: `The all id is missing or does not cumply with the required format` };
};

export const getAllTodos = async(arg) => {
    let val = await validateGetTodos(arg);
    if(val) return val;
    let res = await fetch(`http://172.16.101.146:5804/todos/${arg.todoId}`);
    if(res.status === 404) return {status: 204, message: `This file do not exist`};
    let data = await res.json();
    return data;
};

const validateAddTodo = async ({ userId, title, completed }) => {
    if(typeof userId !== "number" || userId === undefined) return {status: 406, message: `The user id is missing or does not cumply with the required format` };
    if(typeof title !== "sting" || title === undefined) return {status: 406, message: `The title is missing or does not cumply with the required format` };
    if(typeof completed !== "boolean" || completed === undefined) return {status: 406, message: `The completed flag is missing or does not comply with the required format` };
    let user = await getUser ({userId});
    if(user.status == 204) return {status: 200, message: `The user to search no exist` };
};

export const addTodo = async(arg) =>{
    let val = await validateAddTodo(arg);
    if (val) return val;
    let config = {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5804/todos`, config);
    let data = await res.json();
    return data;
};

const validateDeleteTodo = async ({ id }) => {
    if(typeof id !== "number" || id === undefined) return {status: 406, message: `The file id does not mmet the required format` };
};

export const delteTodo = async(arg) => {
    let val = await validateDeleteTodo(arg);
    if (val) return val;
    let config = {
        method: "DELETE",
        headers: {"Content-Type": "application/json" }
    };
    let res = await fetch(`http://172.16.101.146:5804/todos/${arg.id}`, config);
    if(res.status == 404) return {status: 406, message: `The all you want to delete is not registered` };
    let data = await res.json();
    data.status = 202;
    data.message =`The ALl ${arg.id} was deleted from database`;
    return data;
};

const validateUpdateTodo = async ({ todoId, userId, title, completed }) => {
    if(typeof todoId !== "number" || todoId === undefined) return {status: 406, message: `The All id is missing or does not comply with the required format` };
    if(typeof userId !== "number" || userId === undefined) return {status: 406, message: `Te user id is missing or does not cumply with the required format` };
    if(typeof title !== "string" || title === undefined) return {status: 406, message: `The title is missing or doe nor comly the required format` };
    if(typeof completed !== "boolean" || completed === undefined) return {status: 406, message: `The complemted flag is missing or does nor comply with the required format` };
};

export const updateTodo = async(arg) => {
    let val = await validateUpdateTodo(arg);
    if(val) return val;
    let config = {
        method: "PUT",
        headers:{"Content-Tyoe": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5804/todos/${arg.todoId}`, config);
    if(res.status === 404) return {status: 204, message: `All does nor exist` };
    let data = await res.json();
    return data;
};