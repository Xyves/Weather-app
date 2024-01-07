/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("window.addEventListener(\"DOMContentLoaded\", () => {\r\n  renderLocation();\r\n});\r\n// import \"./styles.scss\";\r\n// Retrieves and renders the images data from the pexels api\r\nfunction RenderImages() {}\r\nconst apikey = \"563492ad6f917000010000019b983f3b62fe43daa92e746d4553dd35\";\r\nfetch(\"https://api.pexels.com/v1/search?query=green nature&per_page=40  \", {\r\n  method: \"GET\",\r\n  headers: {\r\n    Authorization: apikey,\r\n  },\r\n})\r\n  .then((response) => {\r\n    const json = response.json();\r\n    console.log(json + \"hhh\");\r\n    return json;\r\n  })\r\n  .then((response) => {\r\n    console.log(response);\r\n    console.log(\"1\");\r\n    const number = Math.floor(Math.random() * 40);\r\n    setBackground(response, number);\r\n    return response;\r\n  });\r\n\r\n// Retrieves and renders the weather data of the current position\r\nfunction renderLocation() {\r\n  navigator.geolocation.getCurrentPosition((position) => {\r\n    if (navigator.geolocation) {\r\n      getCurrentLocation(position);\r\n\r\n      // renderWeather()\r\n    } else {\r\n      console.log(\"Geolocation is not supported by this browser.\");\r\n    }\r\n  });\r\n}\r\nconst temperatureButton = document.querySelector(\".temperature\");\r\nconst searchButton = document.querySelector(\".searchButton\");\r\nconst form = document.querySelector(\"form\");\r\n// Renders the weather data of the searched city\r\nsearchButton.addEventListener(\"click\", (e) => {\r\n  e.preventDefault();\r\n  const searchInput = document.querySelector(\"#searchInput\").value;\r\n  changeCityApi(searchInput);\r\n});\r\n\r\ntemperatureButton.addEventListener(\"click\", () => {\r\n  console.log(\"wow\");\r\n  const tempSpan = document.querySelector(\".temperature span\");\r\n  if (tempSpan.textContent === \"°C\") {\r\n    tempSpan.textContent = \"°F\";\r\n  } else {\r\n    tempSpan.textContent = \"°C\";\r\n    tempSpan.value = \"Celsius\";\r\n  }\r\n});\r\n\r\nfunction getCurrentLocation(position) {\r\n  const latitude = position.coords.latitude;\r\n  const longitude = position.coords.longitude;\r\n  const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=659926fa3f43f739566522ramf39f14`;\r\n  console.log(latitude);\r\n  console.log(longitude);\r\n  fetch(url)\r\n    .then((response) => {\r\n      return response.json();\r\n    })\r\n    .then((response) => {\r\n      const address = response.address;\r\n      console.log(address);\r\n      changeCityTitle(address);\r\n      return city;\r\n    })\r\n    .catch((err) => {\r\n      console.log(err);\r\n    });\r\n}\r\nfunction changeCityTitle(address, addressWeather) {\r\n  const weatherH1 = document.querySelector(\".weatherCity\");\r\n  console.log(address + \"Address\");\r\n  console.log(addressWeather + \"Weather\");\r\n  if (address !== \"\") {\r\n    const cityName = address.city;\r\n    const countryName = address.country;\r\n    const fullCityName = `Weather in ${cityName}, ${countryName}`;\r\n    weatherH1.textContent = fullCityName;\r\n  } else {\r\n    console.log(\"here\" + JSON.stringify(addressWeather));\r\n    let location = JSON.stringify(addressWeather);\r\n    let l1 = JSON.parse(location);\r\n    let cityName = l1.location.name;\r\n    console.log(addressWeather + \"Adress\");\r\n    let countryName = l1.location.country;\r\n    let fullCityName = `Weather in ${cityName}, ${countryName}`;\r\n    weatherH1.textContent = fullCityName;\r\n  }\r\n}\r\nfunction changeCityApi(value) {\r\n  const url = `http://api.weatherapi.com/v1/current.json?key=2716ab9a745c4b01a4f101708240201&q=${value}`;\r\n  fetch(url)\r\n    .then((response) => {\r\n      return response.json();\r\n    })\r\n    .then((response) => {\r\n      const location = response;\r\n      console.log(location);\r\n      changeCityTitle(\"\", location);\r\n      return response;\r\n    })\r\n    .catch((err) => {\r\n      console.log(err);\r\n    });\r\n}\r\nfunction setBackground(images, number) {\r\n  const container = document.querySelector(\".container\");\r\n  console.log(\"log function\");\r\n  let stringData = JSON.stringify(images);\r\n  let parsedData = JSON.parse(stringData);\r\n  let imgSrc = parsedData.photos[number].src.original;\r\n  console.log(parsedData);\r\n  container.style.backgroundImage = `url(${imgSrc})`;\r\n  container.style.backgroundRepeat = \"no-repeat\";\r\n  container.style.backgroundPosition = \"center\";\r\n  container.style.backgroundSize = \"cover\";\r\n  container.style.imageRendering = \"-webkit -optimize -contras\";\r\n}\r\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;