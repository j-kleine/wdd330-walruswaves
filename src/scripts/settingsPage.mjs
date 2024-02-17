import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";
import { getSavedLocation, displaySavedLocation, setSavedLocation } from "./utils.mjs";

function settingsPageContent() {
    return `
    <div id="location-seeker" class="weather-location-seeker">
        <label>
            <select name="" id="plunge-select" class="settings-plunge-select" title="Find your plunge location!">
            <option class="option-disabled" value="" disabled="" selected="">Find your location!</option>
            <option value="Espergærde">Espergærde</option>
            <option value="Jammerbugten">Jammerbugten</option>
            <option value="Schausende">Schausende</option>
            </select>
        </label>
    </div>
    <h3 class="settings-heading">Settings</h3>
    <h4 class="settings-subheading">Units</h4>
    <div id="settings-container">
        <div>
            <span class="settings-unit-desc">Temperature</span>
            <div class="settings-unit-value">
                <span id="settings-temp-c" class="settings-active settings-metric">°C</span>
                <span class="vertical-divider">/</span>
                <span id="settings-temp-f" class="settings-inactive settings-imperial">°F</span>
            </div>
        </div>
        <div>
            <span class="settings-unit-desc">Speed</span>
            <div class="settings-unit-value">
                <span id="settings-speed-kmh" class="settings-active settings-metric">kmh</span>
                <span class="vertical-divider">/</span>
                <span id="settings-speed-mph" class="settings-inactive settings-imperial">mph</span>
            </div>
        </div>
        <div>
            <span class="settings-unit-desc">Length</span>
            <div class="settings-unit-value">
                <span id="settings-length-cm" class="settings-active settings-metric">cm</span>
                <span class="vertical-divider">/</span>
                <span id="settings-length-in" class="settings-inactive settings-imperial">in</span>
            </div>
        </div>
    </div>
    <div id="impressum">
        <span id="about-link">About</span>
    </div>
    <div id="impressum-popup"></div>
    `
}

function impressumContent() {
    return `
    <div id="impressum-message">
        <span class="impressum-bold">@2024 walrusWaves</span>
        <span>Joschua Kleine</span>
        <span>WDD330 Final Project</span>
        <span>BYU-I Course</span>
    </div>
    <div id="attributions-message">
        <span><span class="impressum-bold">Fonts </span>by Google API</span>
        <span><span class="impressum-bold">Menu Icons </span>by Microsoft</span>
        <span><span class="impressum-bold">Image </span>by Matt Hardy via Pexels</span>
    </div>
    <span id="close-impressum">Close</span>
    `
}

function renderImpressum() {
    // add eventlistener 'click' to about button
    document.querySelector('#about-link').addEventListener('click', () => {
        // hide impressum popup
        document.querySelector('#impressum-popup').style.display = "none";
        removePageContent('#impressum-popup');

        // call impressumContent function to populate impressum popup
        document.querySelector('#impressum-popup').insertAdjacentHTML('afterbegin', impressumContent());
        document.querySelector('#impressum-popup').style.display = "flex";
        
        // console.log(impressumContent());

        // add eventlistener 'click' to close impressum button
        document.querySelector('#close-impressum').addEventListener('click', () => {
            // empty out impressum popup to close
            document.querySelector('#impressum-popup').style.display = "none";
            removePageContent('#impressum-popup');
        })
    })
}

function renderSettingsPage() {
    // set document title to '... Settings'
    document.title = 'walrusWaves | Settings';

    // empty out main to prepare for reload
    removePageContent('main');

    // call homePageContent function to populate <main>
    document.querySelector('main').insertAdjacentHTML('afterbegin', settingsPageContent());

    // add active circle to home and remove other two in bottom menubar
    switchActiveMenuIcon('#settings', '#home', '#weather');

    const selectedLocation = getSavedLocation();
    displaySavedLocation(selectedLocation);
    setSavedLocation();
    
    renderImpressum();
}

export function loadSettingsPage() {
    // add eventlistener 'click' to settings icon
    document.querySelector('#settings').addEventListener('click', () => {
        renderSettingsPage();
    })
}