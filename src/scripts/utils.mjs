import { renderWeatherPage } from "./weatherPage.mjs";
import { checkStoredUnit } from "./unitSwitcher.mjs";

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setSavedLocation(selectedLocation) {
  if (selectedLocation) {
    renderWeatherPage();
    createWeatherURL(selectedLocation).then(weatherURL => {
      weatherAPI(weatherURL);
    });
    createWaterURL(selectedLocation).then(waterURL => {
      waterAPI(waterURL);
    });
  } else {
    // add eventlistener 'change' to dropdown
    document.querySelector('#plunge-select').addEventListener('change', (event) => {
      const selectedLocation = event.target.value;
      setLocalStorage('select-location', selectedLocation);
      renderWeatherPage();
      createWeatherURL(selectedLocation).then(weatherURL => {
        weatherAPI(weatherURL);
      });
      createWaterURL(selectedLocation).then(waterURL => {
        waterAPI(waterURL);
      });
    });
  }
}

export function getSavedLocation() {
  const selectedLocation = getLocalStorage('select-location');
  return selectedLocation
}

export function displaySavedLocation(selectedLocation) {
  if (selectedLocation) {
    document.querySelector('#plunge-select').value = selectedLocation;
  }
}

async function findCoordinates(selectedLocation) {
  const cityListURL = 'https://j-kleine.github.io/wdd330-walruswaves/src/json/cityList.json';
  const response = await fetch(cityListURL);
  const data = await response.json();
  
  // Find the city object in the data array that matches the selected city name
  const selectedCity = data.cities.find(city => city.displayName === selectedLocation);
  
  // If the selected city is found, extract its latitude and longitude
  if (selectedCity) {
      const { displayName, lat, lng } = selectedCity;
      // console.log(selectedLocation + ':' + lat, lng)
      return { displayName, lat, lng };
  } else {
      // Handle case when selected city is not found
      console.error('City not found');
      return null;
  }
}

async function createWeatherURL(selectedLocation) {
  return findCoordinates(selectedLocation).then(coordinate => {
        // const name = coordinate.displayName;
        const lat = coordinate.lat;
        const lng = coordinate.lng;

        const APIkey = 'ef87a209058e4633a7c121100242002';
        const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${lat},${lng}&aqi=no`;


                    // OPENWETHERMAP TEST API
                    // const unit = 'metric';
                    // const APIkey = '96b776019148012b0ca89f700b1532be';

                    // const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${unit}&appid=${APIkey}`;
        
        // console.log(weatherURL);
        
        return weatherURL
      })
}

async function createWaterURL(selectedLocation) {
  return findCoordinates(selectedLocation).then(coordinate => {
        // const name = coordinate.displayName;
        const lat = coordinate.lat;
        const lng = coordinate.lng;

        const APIkey = 'ef87a209058e4633a7c121100242002';
        const waterURL = `https://api.weatherapi.com/v1/marine.json?key=${APIkey}&q=${lat},${lng}&days=1`;

        // console.log(waterURL);

        return waterURL
      })
}

async function weatherAPI(URL) {
  try {
      const response = await fetch(URL);
      if (response.ok) {
          const data = await response.json();
          // console.log(JSON.stringify(data));
          displayCurrentWeather(data);
      } else {
          throw Error(await response.text());
      }
  } catch (error) {
      console.log(error);
  }
}

async function waterAPI(URL) {
  try {
      const response = await fetch(URL);
      if (response.ok) {
          const data = await response.json();
          // console.log(JSON.stringify(data));
          displayCurrentWater(data);
      } else {
          throw Error(await response.text());
      }
  } catch (error) {
      console.log(error);
  }
}

function displayCurrentWeather(data) {
  const tempUnit = checkStoredUnit('settings-temp');
  const speedUnit = checkStoredUnit('settings-speed');

  const airTemp = document.querySelector('#air-temp-value');
  const weatherIcon = document.querySelector('#weather-icon');
  const windSpeed = document.querySelector('#windspeed');
  const windDirection = document.querySelector('#wind-direction');
  const uvIndex = document.querySelector('#uv-index');

  // console.log(JSON.stringify(data));

  let roundedAirTemp;
  if (tempUnit == 'imperial') {
    roundedAirTemp = data.current.temp_f.toFixed(0);
    document.querySelector('.air-temp-unit').innerHTML = 'Fahrenheit';
  } else {
    roundedAirTemp = data.current.temp_c.toFixed(0);
    document.querySelector('.air-temp-unit').innerHTML = 'Celsius';
  }
  if (roundedAirTemp == -0) {
      roundedAirTemp = 0;
  }
  airTemp.innerHTML = `${roundedAirTemp}&deg;`;
  const iconsrc = data.current.condition.icon;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', `weather icon for "${data.current.condition.text}" - weatherapi.com`);
  
  if (speedUnit == 'imperial') {
    windSpeed.innerHTML = `${data.current.wind_mph} mph`;

  } else {
    windSpeed.innerHTML = `${data.current.wind_kph} kmh`;
  }
  
  windDirection.innerHTML = `${data.current.wind_dir}`;

  uvIndex.innerHTML = data.current.uv.toFixed(0);

}

function displayCurrentWater(data) {
  const tempUnit = checkStoredUnit('settings-temp');
  const lengthUnit = checkStoredUnit('settings-length');

  const waterTemp = document.querySelector('#water-temp-value');
  const sunriseTime = document.querySelector('#sunrise-time');
  const sunsetTime = document.querySelector('#sunset-time');

  // console.log(JSON.stringify(data));

  let roundedWaterTemp;
  if (tempUnit == 'imperial') {
    roundedWaterTemp = data.forecast.forecastday[0].hour[7].water_temp_f.toFixed(0);
    document.querySelector('.water-temp-unit').innerHTML = 'Fahrenheit';
  } else {
    roundedWaterTemp = data.forecast.forecastday[0].hour[7].water_temp_c.toFixed(0);
    document.querySelector('.water-temp-unit').innerHTML = 'Celsius';
  }
  if (roundedWaterTemp == -0) {
      roundedWaterTemp = 0;
  }
  waterTemp.innerHTML = `${roundedWaterTemp}&deg;`;

  sunriseTime.innerHTML = data.forecast.forecastday[0].astro.sunrise;
  // console.log(sunriseTimeString);
  // sunriseTime.innerHTML = data.forecast.forecastday[0].astro.sunrise.split(' ')[0];

  sunsetTime.innerHTML = data.forecast.forecastday[0].astro.sunset;

  const tideChart = document.querySelector('#tide-events')
  data.forecast.forecastday[0].day.tides[0].tide.forEach((event) => {
    
    let tideEvent = document.createElement('div');
    tideEvent.setAttribute('class', 'tide-event');
    tideChart.appendChild(tideEvent);

    let tideTime = document.createElement('span');
    tideTime.setAttribute('class', 'tide-time weather-info-value');
    tideTime.textContent = event.tide_time.split(' ')[1];
    tideEvent.appendChild(tideTime);

    let tideStatus = document.createElement('span');
    tideStatus.setAttribute('class', 'tide-status weather-info-value');
    tideStatus.textContent = event.tide_type;
    tideEvent.appendChild(tideStatus);

    let tideHeight = document.createElement('span');
    tideHeight.setAttribute('class', 'tide-height weather-info-value');
    let tideHeightMultiplier;
    let unit;
    if (lengthUnit == 'imperial') {
      tideHeightMultiplier = 3.281;
      unit = 'ft';
    } else {
      tideHeightMultiplier = 1;
      unit = 'm';
    }
    tideHeight.textContent = '+' + (Number(event.tide_height_mt) * tideHeightMultiplier).toFixed(1) + ' ' + unit;
    tideEvent.appendChild(tideHeight);
  })
}