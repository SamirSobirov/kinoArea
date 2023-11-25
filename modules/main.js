import { getData } from "/modules/helpers";
import { headerCreate, reload } from "/modules/ui";



let body = document.body
let header = document.querySelector('header')
let place = document.querySelector('.movies')
let iframe = document.querySelector('iframe')

let pop_movies = document.querySelector('.upcoming')



headerCreate(header)




export function setTrailer(video) {
    iframe.src = "https://www.youtube.com/embed/" + video.key
}

setTrailer(iframe)






Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        let item = movies.data.results[Math.floor(Math.random() * movies.data.results.length)]
        reload(movies.data.results.slice(0, 8), place, genres.data.genres)
        body.style.backgroundImage = `url(${import.meta.env.VITE_BASE_IMG + item.backdrop_path})`
        reload(movies.data.results.slice(0, 4), pop_movies, genres.data.genres)
    })



