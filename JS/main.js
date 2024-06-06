import { getAllAlbums, addAlbum, deleteAlbum } from "./module/album.js";
import { addPost } from "./module/posts.js";

let menuAlbum = async() => {
    let menu = prompt(`
    Album menu ?
    1. Search All
    2. Add
    3. Delete
    `, 1);
    menu = Number(menu);
    if(menu == 1){
        return await getAllAlbums();
    };
    if(menu == 2){
        let userId = prompt("Enter the user id", 10);
        let title = prompt("Enter the album title", "Gallery");
        return await addAlbum({userId, title});
    }
    if(menu == 3){
        let id = prompt("Enter the Id of the album you want to delete")
        return await deleteAlbum({id});
    }
}
let menuPost = async() => {
    let menu = prompt(`
    Album posts
    1. Search All
    2. Add
    3. Delete
    `, 1);
    menu = Number(menu);
    if(menu ==2){
        let userId = prompt("Enter the user id", 10);
        let title = prompt("Enter the title of the post", "Music");
        let body = prompt("Enter the content of the publication","");
        return await addPost({userId, title, body});
    };
}
let opc = null;
do{
    opc =  prompt(`
        Select an option
        1. Album
        2. Post
        0. Exit
    `, 1);
    opc = Number(opc);
    if(opc == 1) alert(JSON.stringify(await menuAlbum(), null, 4));
    if(opc == 1) alert(JSON.stringify(await menuPost(), null, 4));
}while(opc)