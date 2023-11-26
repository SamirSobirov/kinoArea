import { getData } from "/modules/helpers";
import { headerCreate, reload } from "/modules/ui";



let body = document.body
let header = document.querySelector('header')
let place = document.querySelector('.movies')
let iframe = document.querySelector('iframe')

let pop_movies = document.querySelector('.upcoming')

let footer_trailer = document.querySelector('.trailers__footer')

let first_section_moreBtn = document.querySelector('.first-section .more')


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
        reload(movies.data.results.slice(0, 12), footer_trailer, genres.data.genres)

  


    
getData('/movie/popular')
.then(res => {
    let item = res.data.results[Math.floor(Math.random() * res.data.results.length)]
    reload(res.data.results.slice(0, 8), place)
    body.style.backgroundImage = `url(${import.meta.env.VITE_BASE_IMG + item.backdrop_path})`

    first_section_moreBtn.onclick = () => {
        let item = first_section_moreBtn
        if (item.dataset.count === 'not-all') {
            reload(res.data.results, place)
            item.dataset.count = 'all'
            item.innerHTML = 'Скрыть'
        } else {
            reload(res.data.results.slice(0, 8), place)
            item.dataset.count = 'not-all'
            item.innerHTML = 'Все новинки'
        }
    }
})  


})
