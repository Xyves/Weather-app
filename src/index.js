window.addEventListener("DOMContentLoaded", () => {
  checkCurrentLocation();
});
// import "./styles.scss";

// fetch("https://api.pexels.com/v1/search?query=weather", {
//   method: "GET",
//   headers: {
//     Authorization: ZPkwlkus8Y2GdSSIcOIv1g1c9m7hItHsfLKAZw7GbCztE2GyCt4BgJDB,
//   },
// }).then((response) => {
//   return response.json();
// });
const temperatureButton = document.querySelector(".temperature");
const searchButton = document.querySelector(".searchButton");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#searchInput").value;
  changeCityApi(searchInput);
  // console.log(location + "hey");
  // changeCityTitle("", location);
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
function checkCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    if (navigator.geolocation) {
      showCity(position);
      console.log("log");
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });
}

function showCity(position) {
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
    let cityName = l1.name;
    console.log(addressWeather + "Adress");
    let countryName = l1.country;
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
      const location = response.location;
      console.log(location);
      changeCityTitle("", location);
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}
