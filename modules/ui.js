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

export function reload() {}