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

			location.assign(`/pages/movieid.html?id=${item.id}"`)

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











