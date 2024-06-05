export const getAllAlbums = async()=>{
    let res = await fetch("https://jsonplaceholder.typicode.com/albums");
    let data = await res.json();
    return data
};

const validateAddAlbum = async({userId, title})=>{
    if(typeof userId !== "number" || userId === undefined) return {status: 406, message: `The user data no arriving`};
    if(typeof title !== "string" || title === undefined) return {status: 406, message: `The title data is not arriving`};
};

export const addAlbum = async arg =>{
    let val = await validateAddAlbum(arg);
    if(val) return val;
    let config = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(arg)
    }
    let res = await fetch("https://jsonplaceholder.typicode.com/albums", config);
    let data = await res.json();
    return data;
}
