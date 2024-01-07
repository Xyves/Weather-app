window.addEventListener("DOMContentLoaded", () => {
  renderLocation();
});
// import "./styles.scss";
// Retrieves and renders the images data from the pexels api
function RenderImages() {}
const apikey = "563492ad6f917000010000019b983f3b62fe43daa92e746d4553dd35";
fetch("https://api.pexels.com/v1/search?query=green nature&per_page=40  ", {
  method: "GET",
  headers: {
    Authorization: apikey,
  },
})
  .then((response) => {
    const json = response.json();
    console.log(json + "hhh");
    return json;
  })
  .then((response) => {
    console.log(response);
    console.log("1");
    const number = Math.floor(Math.random() * 40);
    setBackground(response, number);
    return response;
  });

// Retrieves and renders the weather data of the current position
function renderLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    if (navigator.geolocation) {
      getCurrentLocation(position);

      // renderWeather()
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });
}
const temperatureButton = document.querySelector(".temperature");
const searchButton = document.querySelector(".searchButton");
const form = document.querySelector("form");
// Renders the weather data of the searched city
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#searchInput").value;
  changeCityApi(searchInput);
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
  const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=659926fa3f43f739566522ramf39f14`;
  console.log(latitude);
  console.log(longitude);
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const address = response.address;
      console.log(address);
      changeCityTitle(address);
      return city;
    })
    .catch((err) => {
      console.log(err);
    });
}
function changeCityTitle(address, addressWeather) {
  const weatherH1 = document.querySelector(".weatherCity");
  console.log(address + "Address");
  console.log(addressWeather + "Weather");
  if (address !== "") {
    const cityName = address.city;
    const countryName = address.country;
    const fullCityName = `Weather in ${cityName}, ${countryName}`;
    weatherH1.textContent = fullCityName;
  } else {
    console.log("here" + JSON.stringify(addressWeather));
    let location = JSON.stringify(addressWeather);
    let l1 = JSON.parse(location);
    let cityName = l1.location.name;
    console.log(addressWeather + "Adress");
    let countryName = l1.location.country;
    let fullCityName = `Weather in ${cityName}, ${countryName}`;
    weatherH1.textContent = fullCityName;
  }
}
function changeCityApi(value) {
  const url = `http://api.weatherapi.com/v1/current.json?key=2716ab9a745c4b01a4f101708240201&q=${value}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const location = response;
      console.log(location);
      changeCityTitle("", location);
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}
function setBackground(images, number) {
  const container = document.querySelector(".container");
  console.log("log function");
  let stringData = JSON.stringify(images);
  let parsedData = JSON.parse(stringData);
  let imgSrc = parsedData.photos[number].src.original;
  console.log(parsedData);
  container.style.backgroundImage = `url(${imgSrc})`;
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundPosition = "center";
  container.style.backgroundSize = "cover";
  container.style.imageRendering = "-webkit -optimize -contras";
}
