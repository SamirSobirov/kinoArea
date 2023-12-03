import { trail, reloadPopularPerson } from "./ui";
import { getData } from "/modules/helpers";
import { headerCreate, reload, reload_search_movie, reload_search_actor } from "/modules/ui";



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
        // trail(movies.data.results.slice(0,100), footer_trailer)


        getData('/person/popular')
            .then(({ data }) => {
                reloadPopularPerson(data.results.slice(0, 2), popular_person_cont)
                reloadPopularPerson(data.results.slice(2), popular_person_cart_cont)
            })



        getData('/movie/top_rated')
            .then((res) => {
                trail(res.data.results, footer_trailer);
            })


        getData('/movie/popular')
            .then(res => {
                reload(res.data.results.slice(0, 8), place)

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



//search
const search_btn = document.querySelector('button[data-popup="search"]');

let search_input = document.querySelector('.search_input');
let btn_close = document.getElementById("close");
let search_box = document.querySelector('.search_box');
let results_box = document.querySelector('.movie_box')
let actor_box = document.querySelector('.actor_box')

function debounce(func, timeout = 600) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}



function saveInput() {
    Promise.all([getData(`/search/movie?query=${search_input.value}&page=1`), getData('/genre/movie/list'), getData(`/search/person?query=${search_input.value}`)])
        .then(([movies, genres, actors]) => {
            reload_search_movie(movies.data.results, results_box, genres.data.genres)
            reload_search_actor(actors.data.results, actor_box);
        })
}


const processChange = debounce(() => saveInput())


search_btn.onclick = () => {
    search_box.classList.add('visible');
    document.body.style.overflow = 'hidden';
};

console.log(search_btn);

search_input.onkeyup = () => {
    processChange();
};

btn_close.onclick = () => {
    search_box.classList.remove('visible');
    document.body.style.overflow = 'auto';

};





let genre_list = document.querySelector('.genres ul')

getData('/genre/movie/list')
    .then((genres_res) => {
        const {
            data: {
                genres
            }
        } = genres_res

        reload_genres(genres, genre_list)
    })

    console.log(genre_list);