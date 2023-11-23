import { getData } from "./helpers";
import { headerCreate, reload } from "./ui";

let header = document.querySelector('header')
let place = document.querySelector('.movies')
headerCreate(header)

getData("/movie/now_playing")
    .then((res) => {
        console.log(res.data.results);
        reload(res.data.results, place);
    });
