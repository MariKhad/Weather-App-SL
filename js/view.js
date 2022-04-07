export const IMG_URL = 'http://openweathermap.org/img/w/';
export const WEATHER_UI = {
	BTN_SEARCH: document.querySelector('.weather__btn--search'),
	// SAVED: document.querySelectorAll('.weather__city'),
	SAVED_BTN: document.querySelector('.weather__now--btn'),
	TABS: document.querySelectorAll('.weather__tabs--btn'),
	SEARCH_INPUT: document.querySelector('.weather__city--input'),
	NOW_TEMP: document.querySelector('.weather__now--temp'),
	CITY_NAME: document.querySelectorAll('h3'),
	NOW_IMG: document.querySelector('.weather__now--img'),
	DETAILS_TEMP: document.querySelector('.details__temp'),
	DETAILS_FEELS: document.querySelector('.details__feels'),
	DETAILS_PRES: document.querySelector('.details__precepitations'),
	DETAILS_SUNRISE: document.querySelector('.details__sunrise'),
	DETAILS_SUNSET: document.querySelector('.details__sunset'),
	SAVED_LIST: document.querySelector('.weather_item4'),
	//BTNS_DEL: document.querySelectorAll('.weather__city--del'),
	FORM: document.querySelector('form'),
	UL: document.querySelector('weather__forecast--list'),
}

export function createCityNode(cityName) {
	let li = document.createElement('li')
	let btnCity = document.createElement('button');
	let btnCityDel = document.createElement('button');
	btnCity.textContent = cityName;
	btnCity.classList.add('weather__city');
	btnCityDel.classList.add('weather__city--del');
	li.append(btnCity);
	li.append(btnCityDel);
	ul.prepend(li);
	return ul;
}

export function createForecastNode(list) {
	let {
		dt,
		main: {
			temp,
			feels_like,
		},
		weather: [
			{
				main,
				icon,
			}
		],
	} = list;
	let li = document.createElement('li')
	li.classList.add('forecast__list--item')
	let day = document.createElement('div');
	day.classList.add('forecast__day')
	day.textContent = dateFormat(dt);
	let time = document.createElement('div');
	time.classList.add('forecast__time');
	time.textContent = timeFormat(dt);
	let param = document.createElement('div');
	param.classList.add('forecast__parameters');
	let tempText = document.createElement('p');
	tempText.classList.add('forecast__temp');
	tempText.textContent = "Temperature: " + tempFormat(temp);
	let feels = document.createElement('p');
	feels.classList.add('forecast__feels');
	feels.textContent = "Feels like: " + tempFormat(feels_like);
	param.append(tempText);
	param.append(feels);
	let prep = document.createElement('div');
	prep.classList.add('forecast__precipitatios');
	let text = document.createElement('p');
	text.classList.add('forecast__precipitatios--text');
	text.textContent = main;
	let img = document.createElement('img');
	let imgUrl = `${IMG_URL}${icon}.png`;
	img.setAttribute('src', imgUrl);
	prep.append(text);
	prep.append(img);
	li.append(day);
	li.append(time);
	li.append(param);
	li.append(prep);

	return li;
}

export function dateFormat(date) {
	return new Date(date * 1000).toLocaleDateString('en-GB', {
		month: 'short',
		day: '2-digit',
	})
}

export function timeFormat(ms) {
	return new Date(ms * 1000).toLocaleTimeString('en-GB', {
		hour: 'numeric',
		minute: 'numeric'
	})
}

export function tempFormat(a) {
	let round = Math.round(+a) + "°";
	return round;
}