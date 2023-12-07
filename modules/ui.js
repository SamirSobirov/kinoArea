import { getData } from './http';

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
			<a href="/pages/liked.html">Избранное</a>
		</nav>
		<div class="right">
			<button data-popup="search">
				<img src="/public/icons/search.svg" alt="icon">
			</button>
			<button data-popup="sign-in">Войти</button>
		</div>
    `
}


let genres

getData('/genre/movie/list')
	.then(({ data }) => genres = data.genres)

export function reload(arr, place) {
	if (place) {
		place.innerHTML = ''
		for (let item of arr) {
			let genre_str = ''
			for (let genre of genres) {
				for (let id of item.genre_ids) {
					if (id === genre.id) {
						genre_str += ` ${genre.name},`
					}
				}
			}
			if (place.classList.contains('popup__search-wrapper_movie')) {
				place.innerHTML += `
				<a href="/pages/movieid.html?id=${item.id}">
					<div class="movie-card">
						<div class="image">
							<img src="${import.meta.env.VITE_BASE_IMG + item.poster_path}" alt="image">
						</div>
						<div class="name__genre">
							<p>${item.title}</p>
							<p>${genre_str}</p>
						</div>
						<span>${Math.round(item.vote_average)}</span>
					</div>
				</a>
			`
			} else if (place.classList.contains('popup__search-wrapper_person')) {
				place.innerHTML += `
				<a href="/pages/movieid.html?id=${item.id}">
					<div class="movie-card">
						<div class="image">
							<img src="${import.meta.env.VITE_BASE_IMG + item.poster_path}" alt="image">
						</div>
						<div class="name__genre">
							<p>${item.title}</p>
							<p>${genre_str}</p>
						</div>
						<span>${item.vote_average}</span>
					</div>
				</a>
			`
			} else {
				place.innerHTML += `
				<div class="movie-card" >
					<div class="image">
						<img src="${import.meta.env.VITE_BASE_IMG + item.poster_path}" alt="image">
						<span>${item.vote_average}</span>
						<a href="/pages/movieid.html?id=${item.id}">
							<button></button>
						</a>
					</div>
					<div class="name__genre">
						<p>${item.title}</p>
						<p>${genre_str}</p>
					</div>
				</div>
			`
			}
		}
	}
}

export function reloadTrailerCart(arr, place) {
	place.innerHTML = ''
	for (let item of arr) {
		place.innerHTML += `
		<div class="trailers__footer-item" data-id='${item.id}'>
			<div class="trailers__vid trailers__vid_mini">
				<img class="trailers__iframe trailers__iframe_small" src="${import.meta.env.VITE_BASE_IMG + item.poster_path}" alt='image'>
				<img class="trailers_play-icon trailers_play-icon_mini" src="/public/icons/play.svg" alt="icon">
			</div>
			<p class="trailers__title trailers__title_small">${item.title.split('.').at(0)}</p>
		</div>
		`
	}
}

export function reloadPopularPerson(arr, place) {
	if (place) {
		place.innerHTML = ''
		if (arr.length === 2) {
			for (let item of arr) {
				place.innerHTML += `
			<div class="popular-persons__box">
				<img class="popular-persons__photo" src="${import.meta.env.VITE_BASE_IMG + item.profile_path}" alt="image">
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

export function reloadActors(arr, place) {
	place.innerHTML = ''
	for (let item of arr) {
		place.innerHTML += `
			<div class="main-characters__item">
				<div class="main-characters__image-box">
					<img class="main-characters__image" src="${import.meta.env.VITE_BASE_IMG + item.profile_path}" alt="image">
				</div>
				<div class="main-characters__info">
					<p class="main-characters__name">${item.name}</p>
					<p class="main-characters__name_small">${item.name}</p>
					<p class="main-characters__act-name">${item.original_name}</p>
				</div>
			</div>
		`
	}
}