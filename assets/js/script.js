var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var currentDayEl = document.querySelector("#current-day");

function formSubmitHandler(event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    getWeatherInfo(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a real city");
  }
}

function getWeatherInfo(city) {
  // format weather api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=440f6e98bfd6d64aa6e6b8974736171d";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data, city);
      });
    }
  });
}

function displayWeather(weather, city) {
    currentDayEl.innerHTML = "";

    // display searched city name, temp, wind, humidity, and uv
    var currentDayName = document.createElement("h2");
    currentDayName.textContent = city;

    var currentDayTemp = document.createElement("h4");
    currentDayTemp.textContent = "Temp: " + weather.main.temp;

    var currentDayWind = document.createElement("h4");
    currentDayWind.textContent = "Wind: " + weather.wind.speed;

    var currentDayHum = document.createElement("h4");
    currentDayHum.textContent = "Humidity: " + weather.main.humidity;

    // is there supposed to be a uv index cause I cant find it
    // var currentDayUV = document.createElement("h4");
    // currentDayUV = weather.;

    currentDayEl.appendChild(currentDayName);
    currentDayEl.appendChild(currentDayTemp);
    currentDayEl.appendChild(currentDayWind);
    currentDayEl.appendChild(currentDayHum);
    // currentDayEl.appendChild(currentDayUV);
//   }
}

userFormEl.addEventListener("submit", formSubmitHandler);
