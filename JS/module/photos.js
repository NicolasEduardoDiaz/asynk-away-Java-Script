import { getAlbums } from "./album";

const validateGetPhotos = async ({ photosId }) => {
    if(typeof photosId !== "number" || photosId === undefined) return {status: 406, message: `The phots id is missing or does not cumply with the required format` };
};

export const getAllPhotos = async(arg) => {
    let val = await validateGetPhotos(arg);
    if(val) return val;
    let res = await fetch(`http://172.16.101.146:5803/photos/${photosId}`);
    if(res.status === 404) return {status: 204, message: `Photos do not exist` };
    let data = await res.json();
    return data;
};

const validatAddPhoto = async({ albumId, title, url, thumbnailUrl }) => {
    if(typeof albumId !== "number" || albumId === undefined) return {status: 406, message: `The album id is missing or does not cumply with th required format` };
    if(typeof title !== "string" || title === undefined) return {status: 406, message: `The title is missing or does not cumply with the required format` };
    if(typeof url !== "string" || url === undefined) return {status: 406, message: `The url is missing or does not cumply with the required format` };
    if(typeof thumbnailUrl !== "string" || thumbnailUrl === undefined) return {status: 406, message: `The thumbnailUrl is missing or does not cumply with the required format` };
    let album = await getAlbums ({albumId});
    if(album.status == 204) return {status: 20, message: `The album to search does not exist`};
};

export const addPhoto = async(arg) => {
    let val = await validatAddPhoto(arg);
    if(val) return val;
    let config = {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5803/photos`, config);
    let data = await res.json();
    return data;
};

const validateDeletePhoto = async ({id}) => {
    if(typeof id !== "number" || id === undefined) return {status: 406, message: `The photo id does not meet the required format` };
};

export const deltePhoto = async(arg) => {
    let val = await validateDeletePhoto(arg);
    if(val) return val;
    let config = {
        method: "DELETE",
        headers:{"Content-Type": "application/json" }
    };
    let res = await fetch(`http://172.16.101.146:5803/photos/${arg.id}`, config);
    if(res.status === 404) return {status: 204, message: `The photo you want to delete is not registered` };
    let data = await res.json();
    data.status = 202;
    data.message = `The photo ${arg.id} was deelted from the database`;
    return data;
};

const validateUpdatePhotos = async({ photosId, albumId, title, url, thumbnailUrl }) => {
    if(typeof photosId !== "number" || photosId === undefined) return {status: 406, message: `The photo id is missing or does not cumply with the require format` };
    if(typeof albumId !== "number" || albumId === undefined) return { status: 406, message: `The album id is missing or does not cumply with the required format` };
    if(typeof title !== "string" || title === undefined) return {status: 406, message: `The title is missing or does not cumply with the required format` };
    if(typeof url !== "string" || url === undefined) return {status: 406, message: `The url is missing or does not cumply with the required format` };
    if(typeof thumbnailUrl !== "string" || thumbnailUrl === undefined) return {status: 406, message: `The thumbnailUrl is missing or does not cumply with the required fromat` };
};

export const updatePhoto = async(arg) => {
    let val = await validateUpdatePhotos(arg);
    if(val) return val;
    let config = {
        method: "PUT",
        headers:{"Content-Type": "applicaion/json" },
        body: JSON.stringify(arg)
    };
    let res = await fetch(`http://172.16.101.146:5803/photos/${arg.photosId}`, config);
    if(res.status === 404) return {status: 406, message: `Photo does not exist` };
    let data = await res.json();
    return data;
};