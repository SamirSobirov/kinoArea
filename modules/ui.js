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


		img.onclick = () => {
			getData(`/movie/${item.id}/videos`)
				.then(res => setTrailer(res.data.results[0]))
		}
	}

	// let genres

	// 		for (let item of arr) {
	// 			let genre_str = ''
	// 			for (let genre of genres) {
	// 				for (let id of item.genre_ids) {
	// 					if (id === genre.id) {
	// 						genre_str += ` ${genre.name},`
	// 					}
	// 				}
	// 			}
	// 		}





	
}









