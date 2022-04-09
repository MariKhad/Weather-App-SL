import { WEATHER_UI } from './view.js';
import { createCityNode } from './view.js';
import { createForecastNode } from './view.js';
import { timeFormat } from './view.js';
import { tempFormat } from './view.js';
import { IMG_URL } from './view.js';

addEventListener('DOMContentLoaded', savedCityShow);
addEventListener('DOMContentLoaded', savedCityDelete);
addEventListener('DOMContentLoaded', getData);
addEventListener('DOMContentLoaded', getSavedCities);

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

//const API_WEATHER = 'f660a2fb1e4bad108d6160b7f58c555f';
const API_WEATHER = 'a1cc7dc6cb10240ba58f80b279bd9acb';
const UNITS = 'metric';
const FORECAST_ITEM_LIMIT = "10";
if (localStorage.getItem('currentCityName')) {
	WEATHER_UI.SEARCH_INPUT.value = localStorage.getItem('currentCityName');
} else {
	WEATHER_UI.SEARCH_INPUT.value = 'Kazan';
}

let cityName;
let savedCities = document.querySelectorAll('.weather__city');
let savedCitiesBtns = document.querySelectorAll('.weather__city--del');
if (localStorage.getItem('savedcities')) {
	let cityList = new Set(Array.from(JSON.parse(localStorage.getItem('savedcities'))));
}

WEATHER_UI.FORM.addEventListener('submit', getData);

async function getData() {
	if (WEATHER_UI.SEARCH_INPUT.value !== "") {
		cityName = WEATHER_UI.SEARCH_INPUT.value;
		localStorage.setItem('currentCityName', cityName);
		const url1 = `${WEATHER_URL}?q=${cityName}&appid=${API_WEATHER}&units=${UNITS}`;
		const url2 = `${FORECAST_URL}?q=${cityName}&appid=${API_WEATHER}&cnt=${FORECAST_ITEM_LIMIT}&units=${UNITS}`;
		Promise.all([
			await fetch(url1),
			await fetch(url2),
		])
			.then(async ([json1, json2]) => {
				const weather = await json1.json();
				const forecast = await json2.json();
				getWeather(weather);
				getForecast(forecast);
			})
			.catch(alert)
	} else {
		alert("Enter the city, please")
	}
}

function getSavedCities() {
	if (localStorage.getItem('savedcities')) {
		savedCities = Array.from(JSON.parse(localStorage.getItem('savedcities')));
		for (let city of savedCities) {
			createCityNode(city);
		}
		savedCities = document.querySelectorAll('.weather__city');
		savedCitiesBtns = document.querySelectorAll('.weather__city--del');
	}
	savedCityShow();
	savedCityDelete();
}

function getWeather(json) {
	cityName = WEATHER_UI.SEARCH_INPUT.value;
	let temp = json.main.temp;
	temp = tempFormat(temp);
	WEATHER_UI.NOW_TEMP.textContent = temp;
	let srcUrl = `${IMG_URL}${json.weather[0].icon}.png`;
	WEATHER_UI.NOW_IMG.src = srcUrl;
	for (let city of WEATHER_UI.CITY_NAME) {
		city.textContent = json.name;
	}
	WEATHER_UI.DETAILS_TEMP.textContent = "Temperature: " + temp;
	let feels = json.main.feels_like;
	feels = tempFormat(feels);
	WEATHER_UI.DETAILS_FEELS.textContent = "Feels like: " + feels;
	let pres = json.weather[0].main;
	WEATHER_UI.DETAILS_PRES.textContent = "Weather: " + pres;
	let rise = (json.sys.sunrise);
	rise = timeFormat(rise);
	WEATHER_UI.DETAILS_SUNRISE.textContent = "Sunrise: " + rise;
	let set = (json.sys.sunset);
	set = timeFormat(set);
	WEATHER_UI.DETAILS_SUNSET.textContent = "Sunset: " + set;

}




function getForecast(json) {
	listForecast.innerHTML = "";
	let arrayForecast = [].concat(json.list)
	for (let item of arrayForecast) {
		let li = createForecastNode(item);
		listForecast.append(li);
	}
}

WEATHER_UI.SAVED_BTN.addEventListener('click', function () {
	cityName = document.querySelector('h3').textContent;
	if (!cityList.has(cityName)) {
		cityList.add(cityName);
		console.log(cityList);
		localStorage.setItem('savedcities', JSON.stringify(Array.from(cityList)));
		createCityNode(cityName);
		savedCities = document.querySelectorAll('.weather__city');
		savedCitiesBtns = document.querySelectorAll('.weather__city--del');
		savedCityShow();
		savedCityDelete();
	}
})

function savedCityShow() {
	savedCities = document.querySelectorAll('.weather__city');
	for (let city of savedCities) {
		city.addEventListener('click', function (event) {
			cityName = event.target.textContent;
			WEATHER_UI.SEARCH_INPUT.value = cityName;
			getData();
		})
	}
}

function savedCityDelete() {
	if (savedCitiesBtns) {
		for (let btn of savedCitiesBtns) {
			btn.addEventListener('click', function (event) {
				const targetCity = event.target;
				cityName = targetCity.previousSibling.textContent;
				cityList.delete(cityName);
				localStorage.setItem('savedcities', JSON.stringify(Array.from(cityList)));
				targetCity.parentNode.remove();
				savedCities = document.querySelectorAll('.weather__city');
				savedCitiesBtns = document.querySelectorAll('.weather__city--del');
			});
		}
	}
}


function deleteClassesActive() {
	WEATHER_UI.TABS.forEach(el => el.classList.remove('weather__tabs--btnactive'));
}

for (let tab of WEATHER_UI.TABS) {
	tab.addEventListener('click', function () {
		deleteClassesActive();
		tab.classList.add('weather__tabs--btnactive')
		const href = tab.getAttribute('href').slice(1);
		const id = "#" + href;
		document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
		document.querySelector(id).classList.add('active');
	})
}

/* function tempFormat(a) {
	let round = Math.round(+a) + "°";
	return round;
} */






/* function addZero(time) {
	if (time < 10) {
		time = "0" + String(time);
	}
	return time;
}

function getTime(unix) {
	let time = new Date(unix * 1000);
	let hours = time.getHours();
	hours = addZero(hours);
	let minutes = 0 + time.getMinutes();
	minutes = addZero(minutes);
	let fullTime = hours + ":" + minutes;
	return fullTime;
} */

