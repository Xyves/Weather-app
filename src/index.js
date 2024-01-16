import { format } from "date-fns";
const dateText = document.querySelector("#currentDate");
const temperatureButton = document.querySelector(".temperature");
const tempSpan = document.querySelector(".temperature span");
const form = document.querySelector("form");
const celsius = "°C";
const farenheit = "°F";

window.addEventListener("DOMContentLoaded", () => {
  renderLocation();
  RenderImages();
  changeCityApi("Sydney").then((response) => {
    changeWeather(response);
    changeCityTitle("", response.location);
  });
});

// Retrieves and renders the images from pexels api
function RenderImages() {}
const apikey = "563492ad6f917000010000019b983f3b62fe43daa92e746d4553dd35";
fetch("https://api.pexels.com/v1/search?query=nature+landscape&per_page=20  ", {
  method: "GET",
  headers: {
    Authorization: apikey,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const number = Math.floor(Math.random() * 20);
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
    changeCityTitle("", result.location);
    changeWeather(result);
  });
  form.reset();
});

temperatureButton.addEventListener("click", () => {
  if (tempSpan.textContent === celsius) {
    tempSpan.textContent = farenheit;
  } else {
    tempSpan.textContent = celsius;
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
  const url = `https://api.weatherapi.com/v1/forecast.json?key=k%L8jk%7NF&q=${value}&days=6`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
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
  const tempFeel = document.querySelector(".tempFeel");
  const windSpeed = document.querySelector(".wind-speed");
  const description = document.querySelector("#description");
  let weatherIcon = document.querySelector(".weather-icon");
  const minmaxTemp = document.querySelector(".minmax-temp");
  const humidity = document.querySelector(".humidity");
  const cloudCover = document.querySelector(".cloud-cover");
  const temperatureButtonText =
    temperatureButton.querySelector("span").textContent;

  //  Manipulate dom
  const dateList = document.querySelectorAll(".date");
  const conditionList = document.querySelectorAll(".condition");
  const iconList = document.querySelectorAll(".conditionIcon");
  const maxTempElements = document.querySelectorAll(".warm");
  const minTempElements = document.querySelectorAll(".cool");

  // Loop over every div
  for (let i = 1; i < 6; i++) {
    const date = format(
      new Date(new Date().setDate(new Date().getDate() + [i + 4])),
      "EEEE"
    );

    // Loop over every day
    for (let j = 0; j < dateList.length; j++) {
      if (i - 1 === j) {
        dateList[j].textContent = date;
        iconList[j].src = obj.forecast.forecastday[
          j
        ].day.condition.icon.replace("64x64", "128x128");
        conditionList[j].textContent =
          obj.forecast.forecastday[j].day.condition.text;
        if (temperatureButtonText === celsius) {
          minTempElements[j].textContent =
            obj.forecast.forecastday[j].day.mintemp_c + celsius;
          maxTempElements[j].textContent =
            obj.forecast.forecastday[j].day.maxtemp_c + celsius;
        } else {
          minTempElements[j].textContent =
            obj.forecast.forecastday[j].day.mintemp_f + farenheit;
          maxTempElements[j].textContent =
            obj.forecast.forecastday[j].day.maxtemp_f + farenheit;
        }
      }
    }
  }
  if (temperatureButtonText === celsius) {
    currentTemp.textContent = obj.current.temp_c + celsius;
    tempFeel.textContent = obj.current.feelslike_c + celsius;
    minmaxTemp.textContent =
      Math.round(obj.forecast.forecastday[0].day.mintemp_c) +
      "/" +
      Math.round(obj.forecast.forecastday[0].day.maxtemp_c) +
      celsius;
  } else {
    currentTemp.textContent = obj.current.temp_f + farenheit;
    tempFeel.textContent = obj.current.feelslike_f + farenheit;
    minmaxTemp.textContent =
      Math.round(obj.forecast.forecastday[0].day.mintemp_f) +
      "/" +
      Math.round(obj.forecast.forecastday[0].day.maxtemp_f) +
      farenheit;
  }
  windSpeed.textContent = obj.current.wind_kph + "km/h";
  humidity.textContent = obj.current.humidity + "%";
  cloudCover.textContent = obj.current.cloud + "%";
  description.textContent = obj.current.condition.text;
  weatherIcon.src = obj.current.condition.icon;
  dateText.textContent = format(new Date(), "dd/MM/yyyy");
}
function toCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}
function changeDegrees() {
  const tempSpan = document.querySelector(".temperature span");
  const tempFeel = document.querySelector(".tempFeel");
  let currentTemp = document.querySelector(".current-temp");
  let minmaxTempEl = document.querySelector(".minmax-temp");
  const numbers = minmaxTempEl.textContent.split("/");

  // Parse the numbers and store them in variables
  const beforeSlash = parseInt(numbers[0], 10);
  const afterSlash = parseInt(numbers[1], 10);
  let currTempNum = parseFloat(
    currentTemp.textContent.replace(/[^0-9.-]/g, "")
  );
  let tempFeelTemp = parseFloat(tempFeel.textContent.replace(/[^0-9.-]/g, ""));

  if (tempSpan.textContent === celsius) {
    currentTemp.textContent = Math.round(toCelsius(currTempNum)) + celsius;
    minmaxTempEl.textContent =
      Math.round(toCelsius(beforeSlash)) +
      "/" +
      Math.round(toCelsius(afterSlash)) +
      celsius;
    tempFeel.textContent = Math.round(toCelsius(tempFeelTemp)) + celsius;
  } else {
    currentTemp.textContent = Math.round(toFahrenheit(currTempNum)) + farenheit;
    minmaxTempEl.textContent =
      Math.round(toFahrenheit(beforeSlash)) +
      "/" +
      Math.round(toFahrenheit(afterSlash)) +
      farenheit;
    tempFeel.textContent = Math.round(toFahrenheit(currTempNum)) + farenheit;
  }
  updateTemperature();
}
// Update every temperature range for future weather divs
function updateTemperature() {
  const maxTempElements = document.querySelectorAll(".warm");
  const minTempElements = document.querySelectorAll(".cool");

  function updateTemperatureFahrenheit(elements) {
    elements.forEach((element) => {
      element.textContent =
        Math.round(
          toCelsius(parseFloat(element.textContent.replace(/[^0-9.-]/g, "")))
        ) + celsius;
    });
  }

  function updateTemperatureCelsius(elements) {
    elements.forEach((element) => {
      element.textContent =
        Math.round(
          toFahrenheit(parseFloat(element.textContent.replace(/[^0-9.-]/g, "")))
        ) + farenheit;
    });
  }
  if (tempSpan.textContent === celsius) {
    updateTemperatureFahrenheit(maxTempElements);
    updateTemperatureFahrenheit(minTempElements);
  } else {
    updateTemperatureCelsius(maxTempElements);
    updateTemperatureCelsius(minTempElements);
  }
}
