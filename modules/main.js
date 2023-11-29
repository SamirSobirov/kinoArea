import { trail, reloadPopularPerson } from "./ui";
import { getData } from "/modules/helpers";
import { headerCreate, reload } from "/modules/ui";



let body = document.body
let header = document.querySelector('header')
let place = document.querySelector('.movies')
let iframe = document.querySelector('iframe')

let pop_movies = document.querySelector('.upcoming')

let footer_trailer = document.querySelector('.trailers__footer')

let first_section_moreBtn = document.querySelector('.first-section .more')

let upcomingMovies = document.querySelector(".slider-container")

let popular_person_cont = document.querySelector('.popular_person_cont')
let popular_person_cart_cont = document.querySelector('.popular-persons__list')



headerCreate(header)











export function setTrailer(video) {
    iframe.src = "https://www.youtube.com/embed/" + video.key
}

setTrailer(iframe)







Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list'), getData('/movie/upcoming')])
    .then(([movies, genres]) => {
        reload(movies.data.results.slice(0, 4), pop_movies, genres.data.genres)
        reload(movies.data.results.slice(0, 4), upcomingMovies, genres.data.genres)
        trail(movies.data.results, footer_trailer)


        getData('/person/popular')
            .then(({ data }) => {
                reloadPopularPerson(data.results.slice(0, 2), popular_person_cont)
                reloadPopularPerson(data.results.slice(2), popular_person_cart_cont)
            })



        getData('/movie/popular')
            .then(res => {
                reload(res.data.results.slice(0, 8), place)
                body.style.backgroundImage = `url(${import.meta.env.VITE_BASE_URL + item.backdrop_path})`


                console.log(itrem.backdrop_path);



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


