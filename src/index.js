import { format } from "date-fns";
const dateText = document.querySelector("#currentDate");
const temperatureButton = document.querySelector(".temperature");
const searchButton = document.querySelector(".searchButton");
const form = document.querySelector("form");
window.addEventListener("DOMContentLoaded", () => {
  renderLocation();
  RenderImages();
});

// Retrieves and renders the images data from the pexels api
function RenderImages() {}
const apikey = "563492ad6f917000010000019b983f3b62fe43daa92e746d4553dd35";
fetch("https://api.pexels.com/v1/search?query=nature+landscape&per_page=40  ", {
  method: "GET",
  headers: {
    Authorization: apikey,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);
    const number = Math.floor(Math.random() * 40);
    setBackground(response, number);
    return response;
  });

// Retrieves and renders the weather data of the current position
function renderLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    if (navigator.geolocation) {
      getCurrentLocation(position)
        .then((address) => {
          changeCityTitle(address, "");

          changeCityApi(address.city).then((response) => {
            changeWeather(response);
          });
          // changeWeather(){getWeather(){}}
        })
        .catch((error) => {
          throw error;
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });
}

// Renders the weather data of the searched city
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#searchInput").value;
  changeCityApi(searchInput).then((result) => {
    console.log(result);
    changeCityTitle("", result.location);
    changeWeather(result);
  });
  form.reset();
});

temperatureButton.addEventListener("click", () => {
  console.log("wow");
  const tempSpan = document.querySelector(".temperature span");
  if (tempSpan.textContent === "°C") {
    tempSpan.textContent = "°F";
  } else {
    tempSpan.textContent = "°C";
    tempSpan.value = "Celsius";
  }
});

function getCurrentLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const geoUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=659926fa3f43f739566522ramf39f14`;
  return fetch(geoUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      const address = response.address;
      return address;
    })
    .catch((err) => {
      throw err;
    });
}
function changeCityTitle(address, addressWeather) {
  const sidebarCity = document.querySelector("#city-main");

  const weatherH1 = document.querySelector(".weatherCity");
  if (address !== "") {
    const cityName = address.city;
    const countryName = address.country;
    const fullCityName = `Weather in ${cityName}, ${countryName}`;
    weatherH1.textContent = fullCityName;
    sidebarCity.textContent = cityName;
  } else {
    const cityName = addressWeather.name;
    const countryName = addressWeather.country;
    let fullCityName = `Weather in ${cityName}, ${countryName}`;
    weatherH1.textContent = fullCityName;
    sidebarCity.textContent = cityName;
  }
}
function changeCityApi(value) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=2716ab9a745c4b01a4f101708240201&q=${value}&days=5`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    });
}
function setBackground(images, number) {
  const container = document.querySelector(".container");
  let stringData = JSON.stringify(images);
  let parsedData = JSON.parse(stringData);
  let imgSrc = parsedData.photos[number].src.original;

  container.style.backgroundImage = `url(${imgSrc})`;
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundPosition = "center" + "top";
  container.style.backgroundSize = "cover";
}
function changeWeather(obj) {
  const minTempTodayC = obj.forecast.forecastday[0].day.mintemp_c;
  const maxTempTodayC = obj.forecast.forecastday[0].day.maxtemp_c;
  const minTempTodayF = obj.forecast.forecastday[0].day.mintemp_f;
  const maxTempTodayF = obj.forecast.forecastday[0].day.maxtemp_f;
  const condition = obj.current.condition.text;
  let imgSrc = obj.current.condition.icon;
  imgSrc = imgSrc.replace("64x64", "128x128");
  const currentDate = format(new Date(), "dd/MM/yyyy");
  const tempC = obj.current.temp_c;
  const tempF = obj.current.temp_f;
  const windKph = obj.current.wind_kph;
  //  Change dom
  let currentTemp = document.querySelector(".current-temp");
  const minTempEl = document.querySelector(".min-temp");
  const maxTempEl = document.querySelector(".max-temp");
  const windSpeed = document.querySelector(".wind-speed");
  const description = document.querySelector("#description");
  let weatherIcon = document.querySelector(".weather-icon img");
  const celsius = "°C";
  const temperatureButtonText =
    temperatureButton.querySelector("span").textContent;
  if (temperatureButtonText === celsius) {
    currentTemp.textContent = tempC;
    minTempEl.textContent = minTempTodayC;
    maxTempEl.textContent = maxTempTodayC;
  } else {
    currentTemp.textContent = tempF;
    minTempEl.textContent = minTempTodayF;
    maxTempEl.textContent = maxTempTodayF;
  }
  windSpeed.textContent = windKph + "km/h";
  description.textContent = condition;
  console.log(imgSrc);
  console.log(weatherIcon);
  weatherIcon.src = imgSrc;
  dateText.textContent = currentDate;
}
