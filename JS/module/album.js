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
 const validateDeleteAlbum = async({id}) => {
    if(typeof id !== "string" || undefined) return {status: 406, message:``}
 }
 export const deleteAlbum = async arg =>{
    let val = await validateDeleteAlbum(arg);
    if(val) return val;
    let config = {
        method:"DELETE",
        headers:{"Content-Type": "application/json"}
    }
    let res = await fetch(`https://172.16.101.146:5802/albums/${arg.id}`, config);
    if(res.status === 404) return { status: 204, message:``}
    let data = await res.json();
    data.status =202
    data.message= `The album ${arg.id} was deleted from the database`
    return data;
 }