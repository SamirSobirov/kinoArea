import { getData } from "/modules/helpers"
import { setTrailer } from "/modules/main";


export function headerCreate(place) {
	place.innerHTML = ''

	place.innerHTML = `
		<div class="left">
			<a href='/'>
				<img src="/public/images/logo.svg" alt="image">
			</a>
			<img src="/public/images/menu.svg" alt="image">
		</div>
		<nav>
			<a href="#">Афиша</a>
			<a href="#">Медиа</a>
			<a href="#">Фильмы</a>
			<a href="#">Актёры</a>
			<a href="#">Новости</a>
			<a href="#">Подборки</a>
			<a href="#">Категории</a>
		</nav>
		<div class="right">
			<button data-popup="search">
				<img src="/public/icons/search.svg" alt="icon">
			</button>
			<button data-popup="sign-in">Войти</button>
		</div>
    `
}









export function reload(arr, place) {


	place.innerHTML = "";

	for (let item of arr) {

		let img = document.createElement("img");


		img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
		place.append(img);


		place.onclick = () => {
			// getData(`/movie/${item.id}/videos`)
			// 	.then(res => setTrailer(res.data.results[0]))

			location.assign(`/pages/movieid.html?id=${item.id}`)

		}
	}

}



export function reloadPopularPerson(arr, place) {
	if (place) {
		place.innerHTML = ''
		if (arr.length === 2) {
			for (let item of arr) {
				place.innerHTML += `
			<div class="popular-persons__box">
			<img class="popular-persons__photo" src="${`https://image.tmdb.org/t/p/original` + item.profile_path}" alt="image">
				<div class="popular-persons__num">${arr.indexOf(item) + 1}-е место</div>
				<div class="popular-persons__box-item">
					<div class="popular-persons__name">${item.name}</div>
					<div class="popular-persons__name_eng">${item.name}</div>
					<div class="popular-persons__age">${item.age}</div>
				</div>
			</div>
			`
			}
		} else {
			for (let item of arr) {
				place.innerHTML += `
				<div class="popular-persons__cart">
					<div class="popular-persons__cart-item">
						<div class="popular-persons__name">${item.name}</div>
						<div class="popular-persons__name_eng">${item.name}</div>
						<div class="popular-persons__age">${item.age}</div>
					</div>
					<div class="popular-persons__num">${arr.indexOf(item) + 3}-е место</div>
				</div>
			`
			}
		}
	}
}



export function trail(arr, place) {
	place.innerHTML = ""
	for (let item of arr) {
		let img = document.createElement("img");

		img.src = "https://image.tmdb.org/t/p/original" + item.poster_path

		img.onclick = () => {
			let footer_trailer = document.querySelector('.trailers__iframe')
			getData(`/movie/${item.id}/videos`)
				.then(res => setTrailer(res.data.results[0]))
		}

		place.append(img)
	}

}




//now_playing
export function reload_genres(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let li = document.createElement('li')

        li.innerHTML = item.name
        li.id = item.id

        place.append(li)

        li.onclick = () => {
            let now_playing = document.querySelector('.now_playing')

            getData('/discover/movie?with_genres=' + item.id)
                .then(res => reload_movie(res.data.results, now_playing, arr))
        }
    }
}







// SEARCH_MOVIE
export function reload_search_movie(arr, place, genres) {
    place.innerHTML = ""
    for (let movie of arr) {

        let result_item_movie = document.createElement('div')
        let img_poster = document.createElement('img')
        let movie_info = document.createElement('div')
        let movie_info_left = document.createElement('div')
        let movie_name = document.createElement('p')
        let movie_original_name = document.createElement('p')
        let movie_genre = document.createElement('p')
        let movie_info_right = document.createElement('div')
        let movie_rating = document.createElement('p')
        let genre_titles = []

        place.append(result_item_movie)
        result_item_movie.append(img_poster, movie_info)
        movie_info.append(movie_info_left, movie_info_right)
        movie_info_left.append(movie_name, movie_original_name, movie_genre)
        movie_info_right.append(movie_rating)

        for (let id of movie.genre_ids) {
            for (let genre of genres) {
                if (id === genre.id) {
                    genre_titles.push(genre.name)
                }
            }
        }

        result_item_movie.classList.add('result_item_movie')
        movie_info.classList.add('movie_info')
        movie_info_left.classList.add('movie_info_left')
        movie_name.classList.add('movie_name')
        movie_original_name.classList.add('movie_original_name')
        movie_genre.classList.add('movie_genre')
        movie_info_right.classList.add('movie_info_right')

        img_poster.src = 'https://image.tmdb.org/t/p/original/' + movie.poster_path
        movie_name.innerHTML = movie.title
        movie_name.innerHTML = movie.original_title
        movie_genre.innerHTML = genre_titles.join(', ')
        movie_rating.innerHTML = movie.vote_average.toFixed(2)
        if (movie_rating.innerHTML >= 0) {
            movie_info_right.style.backgroundColor = 'red'
        }
        if (movie_rating.innerHTML >= 6) {
            movie_info_right.style.backgroundColor = 'orange'
        }
        if (movie_rating.innerHTML >= 7) {
            movie_info_right.style.backgroundColor = 'green'
        }
    }
}
export function reload_search_actor(arr, place) {
    place.innerHTML = ""
    for (let actor of arr) {
        let actor_item = document.createElement('div')
        let actor_img = document.createElement('img')
        let actor_title_box = document.createElement('div')
        let actor_name = document.createElement('p')
        let actor_original_name = document.createElement('p')
        let actor_post = document.createElement('p')

        place.append(actor_item)
        actor_item.append(actor_img, actor_title_box)
        actor_title_box.append(actor_name, actor_original_name, actor_post)

        actor_item.classList.add('actor_item')
        actor_img.classList.add('actor_img')
        actor_title_box.classList.add('actor_title_box')
        actor_name.classList.add('actor_name')
        actor_original_name.classList.add('actor_original_name')
        actor_post.classList.add('actor_post')

        let profile_path = actor.profile_path ? actor.profile_path : ""
        actor_img.src = `https://image.tmdb.org/t/p/original` + profile_path
        actor_name.innerHTML = actor.name
        actor_original_name.innerHTML = actor.original_name
    }
}



