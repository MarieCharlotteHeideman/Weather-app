function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");

  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = searchInputElement.value;

  getWeather();
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let apiKey = "cd6b0ad6aoad4dt98fd5242505b3e7a3";
let query = document.querySelector("#search-input").innerHTML;

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;

function currentTemperature(response) {
  console.log(response);

  if (response.data.temperature?.current) {
    let temperature = Math.round(response.data.temperature.current);

    let temperatureValue = document.querySelector(".current-temperature-value");

    temperatureValue.innerHTML = `${temperature}`;
  }
}

function getWeather() {
  let query = document.querySelector("#search-input").value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
}
