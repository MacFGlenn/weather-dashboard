var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var currentDayEl = document.querySelector("#current-day");
var searchHistoryEl = document.querySelector("#search-history");
var searchButton = document.querySelector("#search");
var fiveDayEl = document.querySelector("#five-day");

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

function searchHistory(event) {
  event.preventDefault();

  var city = event.target.textContent;

  getWeatherInfo(city);
  cityInputEl.value = "";
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
        oneCall(data.coord.lat, data.coord.lon);
        getFiveDay(city);
      });
    }
  });
}

function oneCall(lat, lon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts&appid=440f6e98bfd6d64aa6e6b8974736171d";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var currentDayUV = document.createElement("h4");
        currentDayUV.textContent = "UV Index: " + data.current.uvi;
        currentDayEl.appendChild(currentDayUV);
      });
    }
  });
}

function getFiveDay(city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=440f6e98bfd6d64aa6e6b8974736171d";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayFiveDoor(data);
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

  var searchHistory = document.createElement("button");
  searchHistory.innerHTML = city;
  searchHistory.setAttribute("type", "click");
  searchHistory.setAttribute("class", "btn");
  searchHistory.setAttribute("class", "border-dark");
  searchHistory.setAttribute("id", "search");

  searchHistoryEl.appendChild(searchHistory);

  // fix
  // var currentDayUV = document.createElement("h4");
  // currentDayUV.textContent = "UV Index: " + data.current.uvi;
  // currentDayEl.appendChild(currentDayUV);

  currentDayEl.appendChild(currentDayName);
  currentDayEl.appendChild(currentDayTemp);
  currentDayEl.appendChild(currentDayWind);
  currentDayEl.appendChild(currentDayHum);
}

function displayFiveDoor(weather) {
  fiveDayEl.innerHTML = "";

  var header = document.createElement("h3");
  header.setAttribute("class", "row");
  header.textContent = "5-Day Forecast";
  fiveDayEl.appendChild(header);

  var dayOneDiv = document.createElement("div");
  fiveDayEl.appendChild(dayOneDiv);

  for (i = 0; i <= weather.list.length; i++) {
    // date
    var date = document.createElement("h4");
    date.setAttribute("class", "card-body");

    date.textContent = JSON.stringify(weather.list[i * 8].dt_txt);

    // icon

    // temp
    var temp = document.createElement("h4");
    temp.setAttribute("class", "card-body");
    temp.textContent = "Temp: " + JSON.stringify(weather.list[i * 8].main.temp);

    // wind speed
    var windSpeed = document.createElement("h4");
    windSpeed.setAttribute("class", "card-body");
    windSpeed.textContent =
      "Wind Speed: " + JSON.stringify(weather.list[i * 8].wind.speed);

    // humidity
    var hum = document.createElement("h4");
    hum.setAttribute("class", "card-body");
    hum.textContent =
      "Humidity: " + JSON.stringify(weather.list[i * 8].main.humidity);

    dayOneDiv.appendChild(date);
    dayOneDiv.appendChild(temp);
    dayOneDiv.appendChild(windSpeed);
    dayOneDiv.appendChild(hum);
  }
}

userFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryEl.addEventListener("click", searchHistory);
