import { getAllAlbums } from "./module/album.js";

console.table(await getAllAlbums({userId: 10, title: "Nicolas"}));