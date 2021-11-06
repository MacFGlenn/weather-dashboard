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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=440f6e98bfd6d64aa6e6b8974736171d";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                displayWeather(data, city);
            })
        }
    })
}

function displayWeather(weather, city) {
    // check that api got info
    if (weather.lenght === 0) {
        alert("No info");
        return;
    }

    // display searched city name, temp, wind, humidity, and uv
    var currentDayEl = document.createElement("h2");
    currentDayEl.textContent = city;
    console.log(currentDayEl);
}

userFormEl.addEventListener("submit", formSubmitHandler);