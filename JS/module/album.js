import { getUser } from "./users";
const validateGetAlbums = async({albumId}) => {
    if(typeof albumId !== "number" || typeof albumId === undefined) return {status: 406, message: `The album id not arriving or does not comply with the required format`};
}

export const getAllAlbums = async(arg) => {
    let val = await validateGetAlbums(arg);
    if (val) return val;
    let res = await fetch(`http://172.16.101.146:5802/albums/${arg.albumId}`);
    if( res.status === 404) return {status: 204, message:`Album does not exist`}
    let data = await res.json();
    return data;
}

const validateAddAlbum = async({userId, title}) => {
    if( typeof userId !== "number" || userId === undefined) return {status: 406, message: `The user id not arriving or does not comply with the required format `};
    if( typeof title !== "string" || title === undefined) return {status: 406, message: `The title id not arriving or does not comply with the required format `};
    let user = await getUser ({userId});
    if(user.status == 204) return {status: 200, message: `The user to search does not exist`};
}

export const addAlbum = async(arg) => {
    let val = await validateAddAlbum(arg);
    if (val) return val;
    let config = {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(arg)
    }
    let res = await fetch("http://172.16.101.146:5802/albums", config);
    let data = await res.json();
    return data;
}

const validateDeleteAlbum = async({id}) => {
    if( typeof id !== "string" || id === undefined) return {status: 406, message: `The album id does not meet`};
}

export const deleteAlbum = async(arg) => {
    let config ={
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    }
    let res = await fetch (`http://172.16.101.146:5802/albums/${arg.id}`, config);
    if(res.status === 404) return {status: 204, message:`The album you want to delete is not registered`};
    let data = await res.json();
    data.status = 202
    data.message = `The album ${arg.id} was deleted from the database`
    return data;
};

const validateUpdateAlbum = async ({albumId, userId, title}) => {
    if(typeof albumId !== "number" || albumId === undefined) return {status: 406, message: `The album id not arriving or does not comply with the required format`};
    if(typeof userId !== "number" || userId === undefined) return {status: 406, message: `The user id not arriving or does not comply with the required format`};
    if(typeof title !== "string" || title === undefined) return {status: 406, message: `The title does not comply with the required format`};
};

export const updateAlbum = async (arg) => {
    let val = await validateUpdateAlbum(arg);
    if (val) return val;
    let config = {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5802/albums/${arg.albumId}`, config);
    if (res.status === 404)
        return {status: 204, message: `Album does not exist` };

    let data = await res.json();
    return data;
}