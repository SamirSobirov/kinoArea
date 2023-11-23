import { getData } from "/modules/helpers";
import { headerCreate, reload } from "/modules/ui";

let header = document.querySelector('header')
let place = document.querySelector('.movies')
let iframe = document.querySelector('iframe')

headerCreate(header)

getData("/movie/now_playing")
    .then((res) => {
        reload(res.data.results, place);
    });



export function setTrailer(video) {
    iframe.src = "https://www.youtube.com/embed/" + video.key
}