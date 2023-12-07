import { headerCreate, reloadActors } from "./ui";
import { getData } from "./http";
import { modalToggleActivate } from "./main";
let header = document.querySelector('header')
let body = document.body
let movie_id = location.search.split('=').at(-1)


headerCreate(header)
modalToggleActivate()


getData(`/movie/${movie_id}`)
    .then(({ data }) => {
        body.style.backgroundImage = `url(${import.meta.env.VITE_BASE_IMG + data.backdrop_path})`

        let poster = document.querySelector('.first-section__poster')

        let desrc = document.querySelector('.first-section__txt')
        let rating = document.querySelector('.first-section__header-bottom-rating')


        desrc.innerHTML = data.overview
        
        let rating_view = data.vote_average.toString().replaceAll('.', '').slice(0, 2)
        let year = document.querySelector('#year')
        let country = document.querySelector('#country')
        let tagline = document.querySelector('#tagline')
        let director = document.querySelector('#director')
        let scenario = document.querySelector('#scenario')
        let producer = document.querySelector('#producer')
        let operator = document.querySelector('#operator')
        let composer = document.querySelector('#composer')
        let art = document.querySelector('#art')
        let visual_effect = document.querySelector('#visual_effect')
        let genre = document.querySelector('#ganre')
        let profit = document.querySelector('#profit')
        let premiere_world = document.querySelector('#premiere_world')
        let premiere_RF = document.querySelector('#premiere_RF')
        let title = document.querySelector('.first-section__title')




        title.innerHTML = data.original_title
        year.innerHTML = data.release_date.split('-').at(0)
        country.innerHTML = ''
        tagline.innerHTML = data.title.split('.').at(0)
        reloadMovieCrews(data.production_countries, country)
        reloadMovieCrews(data.genres, genre)
        profit.innerHTML = data.revenue + '$'
        premiere_world.innerHTML = data.release_date
        premiere_RF.innerHTML = data.release_date



        function reloadMovieCrews(arr, place) {
            place.innerHTML = ''
            arr.forEach((el, idx) => {
                if (idx !== arr.length - 1) {
                    if (el.name !== '' || false) {
                        place.innerHTML += `${el.name}, `
                    } else {
                        place.innerHTML += 'Никого не найдено!'
                    }
                } else {
                    if (el.name !== '' || false) {
                        place.innerHTML += `${el.name}`
                    } else {
                        place.innerHTML += 'Никого не найдено!'
                    }
                }
            })
        }


        getData(`/movie/${movie_id}/credits`)
            .then(({ data }) => {
                let directors = data.crew.filter(el => el.known_for_department === 'Directing')
                let scenarios = data.crew.filter(el => el.known_for_department === 'Writing')
                let producers = data.crew.filter(el => el.known_for_department === 'Production')
                let operators = data.crew.filter(el => el.known_for_department === 'Visual Effects')
                let composers = data.crew.filter(el => el.known_for_department === 'Sound')
                let arts = data.crew.filter(el => el.known_for_department === 'Art')
                let visual_effects = data.crew.filter(el => el.known_for_department === 'Visual Effects')
                reloadMovieCrews(directors, director)
                reloadMovieCrews(scenarios, scenario)
                reloadMovieCrews(producers, producer)
                reloadMovieCrews(operators, operator)
                reloadMovieCrews(composers, composer)
                reloadMovieCrews(arts, art)
                reloadMovieCrews(visual_effects, visual_effect)

                let actorsCont = document.querySelector('.main-characters__main')
                reloadActors(data.crew.slice(0, 10), actorsCont)
            })

        rating.lastElementChild.style.width = `${rating_view}%`
        poster.src = import.meta.env.VITE_BASE_IMG + data.poster_path
    })