import { getData} from './http';
import { headerCreate, reload, reloadPopularPerson, reloadTrailerCart } from "./ui";


let body = document.body
let header = document.querySelector('header')
let movies_cont = document.querySelector('.movies')
let first_section_moreBtn = document.querySelector('.first-section .more')
let trailers__footer = document.querySelector('.trailers__footer')
let popular_person_cont = document.querySelector('.popular_person_cont')
let popular_person_cart_cont = document.querySelector('.popular-persons__list')
let popular_moviesCont = document.querySelector('.popular-movies__slider-container')
let searcher =  document.querySelector('.popup__search-wrapper_movie')

console.log(searcher);

headerCreate(header)




getData('/movie/popular')
    .then(res => {
        let item = res.data.results[Math.floor(Math.random() * res.data.results.length)]
        reload(res.data.results.slice(0, 8), movies_cont)
        body.style.backgroundImage = `url(${import.meta.env.VITE_BASE_IMG + item.backdrop_path})`

        first_section_moreBtn.onclick = () => {
            let item = first_section_moreBtn
            if (item.dataset.count === 'not-all') {
                reload(res.data.results, movies_cont)
                item.dataset.count = 'all'
                item.innerHTML = 'Скрыть'
            } else {
                reload(res.data.results.slice(0, 8), movies_cont)
                item.dataset.count = 'not-all'
                item.innerHTML = 'Все новинки'
            }
        }
        reloadTrailerCart(res.data.results, trailers__footer)

        let trailers__footer_items = document.querySelectorAll('.trailers__footer-item')
        let trailers__iframe_big = document.querySelector('.trailers__iframe_big')
        trailers__footer_items.forEach((el, idx) => {
            if (idx === 0) {
                getData(`/movie/${el.dataset.id}/videos`)
                    .then(({ data }) => {
                        trailers__iframe_big.src = `https://www.youtube.com/embed/${data.results[0].key}`
                    })
            }
            el.onclick = () => {
                getData(`/movie/${el.dataset.id}/videos`)
                    .then(({ data }) => {
                        trailers__iframe_big.src = `https://www.youtube.com/embed/${data.results[0].key}`
                    })
            }
        })

        let keyClass = popular_moviesCont.parentElement.className.split('_').at(0)
        sliderAct(res.data.results, popular_moviesCont, keyClass)
    })

getData('/person/popular')
    .then(({ data }) => {
        reloadPopularPerson(data.results.slice(0, 2), popular_person_cont)
        reloadPopularPerson(data.results.slice(2), popular_person_cart_cont)
    })

getData('/movie/upcoming')
    .then(({ data }) => {
        let upcoming_slider_cont = document.querySelector('.upcoming__slider-container')
        let keyClass = upcoming_slider_cont.parentElement.className.split('_').at(0)
        sliderAct(data.results, upcoming_slider_cont, keyClass)
    })

modalToggleActivate()

export function modalToggleActivate() {
 
}

function sliderAct(data, place, place_className) {
    reload(data, place)
    let slider_prev = document.querySelector(`.${place_className}__slider-prev`)
    let slider_next = document.querySelector(`.${place_className}__slider-next`)
    let slider_fraction = document.querySelector(`.${place_className}__slider-fraction`)
    let scroll_num = place.firstElementChild.getBoundingClientRect().width
    let curr = slider_fraction.firstElementChild
    let total = slider_fraction.lastElementChild
    let curr_num = 4
    let total_num = data.length++
    curr.innerHTML = curr_num
    total.innerHTML = total_num

    slider_next.onclick = () => {
        if (curr_num !== total_num) {
            place.scrollLeft += scroll_num * 4
            curr_num = curr_num + 4
            curr.innerHTML = curr_num
        }
    }
    slider_prev.onclick = () => {
        if (curr_num !== 4) {
            place.scrollLeft -= scroll_num * 4
            curr_num = curr_num - 4
            curr.innerHTML = curr_num
        }
    }
}

















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


