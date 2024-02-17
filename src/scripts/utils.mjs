import { renderWeatherPage } from "./weatherPage.mjs";

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setSavedLocation() {
  // add eventlistener 'change' to dropdown
  document.querySelector('#plunge-select').addEventListener('change', (event) => {
    const selectedLocation = event.target.value;
    setLocalStorage('select-location', selectedLocation);
    renderWeatherPage();
  });
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