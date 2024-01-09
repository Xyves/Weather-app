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
  }
  changeDegrees();
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
  const url = `http://api.weatherapi.com/v1/forecast.json?key=2716ab9a745c4b01a4f101708240201&q=${value}&days=6`;
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
  let currentTemp = document.querySelector(".current-temp");
  const minTempEl = document.querySelector(".min-temp");
  const maxTempEl = document.querySelector(".max-temp");
  const windSpeed = document.querySelector(".wind-speed");
  const description = document.querySelector("#description");
  let weatherIcon = document.querySelector(".weather-icon");
  const celsius = "°C";
  const temperatureButtonText =
    temperatureButton.querySelector("span").textContent;
  let imageSrc = obj.current.condition.icon;
  const weatherObj = {
    today: {
      tempC: obj.current.temp_c,
      tempF: obj.current.temp_f,
      minTempTodayC: obj.forecast.forecastday[0].day.mintemp_c,
      maxTempTodayC: obj.forecast.forecastday[0].day.maxtemp_c,
      minTempTodayF: obj.forecast.forecastday[0].day.mintemp_f,
      maxTempTodayF: obj.forecast.forecastday[0].day.maxtemp_f,
      condition: obj.current.condition.text,
      src: obj.current.condition.icon.replace("64x64", "128x128"),
      windKph: obj.current.wind_kph,
      currentDate: format(new Date(), "dd/MM/yyyy"),
    },
    day1: {
      minTempTodayC: obj.forecast.forecastday[1].day.mintemp_c,
      maxTempTodayC: obj.forecast.forecastday[1].day.maxtemp_c,
      minTempTodayF: obj.forecast.forecastday[1].day.mintemp_f,
      maxTempTodayF: obj.forecast.forecastday[1].day.maxtemp_f,
      src: obj.forecast.forecastday[1].day.condition.icon.replace(
        "64x64",
        "128x128"
      ),
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "dd/MM/yyyy"
      ),
      condition: obj.forecast.forecastday[1].day.condition.text,
    },
    day2: {
      minTempTodayC: obj.forecast.forecastday[2].day.mintemp_c,
      maxTempTodayC: obj.forecast.forecastday[2].day.maxtemp_c,
      minTempTodayF: obj.forecast.forecastday[2].day.mintemp_f,
      maxTempTodayF: obj.forecast.forecastday[2].day.maxtemp_f,
      src: obj.forecast.forecastday[2].day.condition.icon.replace(
        "64x64",
        "128x128"
      ),
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 2)),
        "dd/MM/yyyy"
      ),
      condition: obj.forecast.forecastday[2].day.condition.text,
    },
    day3: {
      minTempTodayC: obj.forecast.forecastday[3].day.mintemp_c,
      maxTempTodayC: obj.forecast.forecastday[3].day.maxtemp_c,
      minTempTodayF: obj.forecast.forecastday[3].day.mintemp_f,
      maxTempTodayF: obj.forecast.forecastday[3].day.maxtemp_f,
      src: obj.forecast.forecastday[3].day.condition.icon.replace(
        "64x64",
        "128x128"
      ),
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 3)),
        "dd/MM/yyyy"
      ),
      condition: obj.forecast.forecastday[3].day.condition.text,
    },
    day4: {
      minTempTodayC: obj.forecast.forecastday[4].day.mintemp_c,
      maxTempTodayC: obj.forecast.forecastday[4].day.maxtemp_c,
      minTempTodayF: obj.forecast.forecastday[4].day.mintemp_f,
      maxTempTodayF: obj.forecast.forecastday[4].day.maxtemp_f,
      src: obj.forecast.forecastday[4].day.condition.icon.replace(
        "64x64",
        "128x128"
      ),
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 4)),
        "dd/MM/yyyy"
      ),
      condition: obj.forecast.forecastday[4].day.condition.text,
    },
    day5: {
      minTempTodayC: obj.forecast.forecastday[5].day.mintemp_c,
      maxTempTodayC: obj.forecast.forecastday[5].day.maxtemp_c,
      minTempTodayF: obj.forecast.forecastday[5].day.mintemp_f,
      maxTempTodayF: obj.forecast.forecastday[5].day.maxtemp_f,
      src: obj.forecast.forecastday[5].day.condition.icon.replace(
        "64x64",
        "128x128"
      ),
      date: format(
        new Date(new Date().setDate(new Date().getDate() + 5)),
        "dd/MM/yyyy"
      ),
      condition: obj.forecast.forecastday[5].day.condition.text,
    },
  };

  //  Manipulate dom
  const dateList = document.querySelectorAll(".date");
  const conditionList = document.querySelectorAll(".condition");
  const iconList = document.querySelectorAll(".conditionIcon");
  const maxTempElements = document.querySelectorAll(".warm");
  const minTempElements = document.querySelectorAll(".cool");
  const farenheit = "°F";
  // Loop over every day
  for (let i = 1; i < 6; i++) {
    const index = Object.values(weatherObj);
    const condition = index[i].condition;
    const Imgsrc = index[i].src;
    const minTempFutureC = index[i].minTempTodayC;
    const minTempFutureF = index[i].minTempTodayF;
    const maxtempFutureC = index[i].maxTempTodayC;
    const maxtempFutureF = index[i].maxTempTodayF;
    const date = index[i].date;

    // Loop over every div element
    for (let j = 0; j < dateList.length; j++) {
      if (i - 1 === j) {
        dateList[j].textContent = date;
        console.log(iconList[j]);
        iconList[j].src = Imgsrc;
        conditionList[j].textContent = condition;
        if (temperatureButtonText === celsius) {
          maxTempElements[j].textContent = maxtempFutureC + celsius;
          minTempElements[j].textContent = minTempFutureC + celsius;
        } else {
          maxTempElements[j].textContent = maxtempFutureF + farenheit;
          minTempElements[j].textContent = minTempFutureF + farenheit;
        }
      }
    }
  }
  if (temperatureButtonText === celsius) {
    currentTemp.textContent = weatherObj.today.tempC + celsius;
    minTempEl.textContent = weatherObj.today.minTempTodayC + celsius;
    maxTempEl.textContent = weatherObj.today.maxTempTodayC + celsius;
    console.log(weatherObj.today.tempC);
  } else {
    currentTemp.textContent = weatherObj.today.tempF + farenheit;
    minTempEl.textContent = weatherObj.today.minTempTodayF + farenheit;
    maxTempEl.textContent = weatherObj.today.maxTempTodayF + farenheit;
  }
  windSpeed.textContent = weatherObj.today.windKph + "km/h";
  description.textContent = weatherObj.today.condition;
  weatherIcon.src = imageSrc;
  dateText.textContent = weatherObj.today.currentDate;
}
function changeDegrees() {
  const tempSpan = document.querySelector(".temperature span");
  const celsius = "°C";
  const farenheit = "°F";
  let currentTemp = document.querySelector(".current-temp");
  const minTempEl = document.querySelector(".min-temp");
  const maxTempEl = document.querySelector(".max-temp");
  const windSpeed = document.querySelector(".wind-speed");
  const description = document.querySelector("#description");
  function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  let currTempNum = parseFloat(
    currentTemp.textContent.replace(/[^0-9.-]/g, "")
  );
  let minTempNum = parseFloat(minTempEl.textContent.replace(/[^0-9.-]/g, ""));
  let maxTempNum = parseFloat(maxTempEl.textContent.replace(/[^0-9.-]/g, ""));

  if (tempSpan.textContent === "°C") {
    currentTemp.textContent = toCelsius(currTempNum).toFixed(2) + celsius;
    minTempEl.textContent = toCelsius(minTempNum).toFixed(2) + celsius;
    maxTempEl.textContent = toCelsius(maxTempNum).toFixed(2) + celsius;
  } else {
    currentTemp.textContent = toFahrenheit(currTempNum).toFixed(2) + farenheit;
    minTempEl.textContent = toFahrenheit(minTempNum).toFixed(2) + farenheit;
    maxTempEl.textContent = toFahrenheit(maxTempNum).toFixed(2) + farenheit;
  }
}
