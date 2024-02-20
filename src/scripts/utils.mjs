import { renderWeatherPage } from "./weatherPage.mjs";

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
    getWeatherURL(selectedLocation).then(weatherURL => {
      weatherAPI(weatherURL);
    });
  } else {
    // add eventlistener 'change' to dropdown
    document.querySelector('#plunge-select').addEventListener('change', (event) => {
      const selectedLocation = event.target.value;
      setLocalStorage('select-location', selectedLocation);
      renderWeatherPage();
      getWeatherURL(selectedLocation).then(weatherURL => {
        weatherAPI(weatherURL);
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

async function getWeatherURL(selectedLocation) {
  return findCoordinates(selectedLocation).then(coordinate => {
        const name = coordinate.displayName;
        const lat = coordinate.lat;
        const lng = coordinate.lng;
        const unit = 'metric';
        const APIkey = '96b776019148012b0ca89f700b1532be';

        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${unit}&appid=${APIkey}`;
        // console.log(weatherURL);
        return weatherURL
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

export function displayCurrentWeather(data) {
  const airTemp = document.querySelector('#air-temp-value');
  const weatherIcon = document.querySelector('#weather-icon');
  const sunriseTime = document.querySelector('#sunrise-time');
  const sunsetTime = document.querySelector('#sunset-time');
  const windspeed = document.querySelector('#windspeed');
  const windDirection = document.querySelector('#wind-direction');
  const uvIndex = document.querySelector('#uv-index');

  // console.log(JSON.stringify(data));
  // console.log(airTemp.innerHTML);

  let roundedAirTemp = data.main.temp.toFixed(0);
  if (roundedAirTemp == -0) {
      roundedAirTemp = 0;
  }
  airTemp.innerHTML = `${roundedAirTemp}&deg;`;
  data.weather.forEach((event) => {
      const iconsrc = `https://openweathermap.org/img/wn/${event.icon}@4x.png`;

      weatherIcon.setAttribute('src', iconsrc);
      weatherIcon.setAttribute('alt', `weather icon ${event.main} - ${event.description}`);
  })
  
  let sunriseTimestamp = data.sys.sunrise;
  // console.log(sunriseTimestamp*1000);
  sunriseTime.innerHTML = new Date(sunriseTimestamp*1000).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'});
  let sunsetTimestamp = data.sys.sunset;
  // console.log(sunsetTimestamp*1000);
  sunsetTime.innerHTML = new Date(sunsetTimestamp*1000).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'});

  windspeed.innerHTML = `${data.wind.speed} m/s`;
  windDirection.innerHTML = `${data.wind.deg}°`;

}