import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";

function weatherPageContent() {
    return `
    <div id="location-seeker" class="weather-location-seeker">
        <label>
            <select name="" id="plunge-select" class="weather-plunge-select" title="Find your plunge location!">
                <option class="option-disabled" value="" disabled="" selected="">Your Location</option>
                <option value="">Espergærde</option>
                <option value="">Jammerbugten</option>
                <option value="">Schausende</option>
            </select>
        </label>
    </div>
    <div id="weather-widget-box">
        <div class="aw-box">
            <span class="aw-box-labels">AIR</span>
            <span id="air-temp-value" class="aw-box-values">7°</span>
            <span class="aw-box-units">CELSIUS</span>
        </div>
        <div>
            <img id="weather-icon" src="https://openweathermap.org/img/wn/02d@4x.png" alt="">
        </div>
        <div class="aw-box">
            <span class="aw-box-labels">WATER</span>
            <span id="water-temp-value" class="aw-box-values">3°</span>
            <span class="aw-box-units">CELSIUS</span>
        </div>
    </div>
    <div id="weather-info-container">
        <div><span class="weather-info-desc">Description</span><span class="weather-info-value">VALUE</span></div>
        <div><span class="weather-info-desc">Description</span><span class="weather-info-value">VALUE</span></div>
        <div><span class="weather-info-desc">Description</span><span class="weather-info-value">VALUE</span></div>
        <div><span class="weather-info-desc">Description</span><span class="weather-info-value">VALUE</span></div>
        <div><span class="weather-info-desc">Description</span><span class="weather-info-value">VALUE</span></div>
        <div><span class="weather-info-desc">Description</span><span class="weather-info-value">VALUE</span></div>
        <div><span class="weather-info-desc">Description</span><span class="weather-info-value">VALUE</span></div>
    </div>
    
    `
}

export function loadWeatherPage() {
    // add eventlistener 'click' to home icon
    document.querySelector('#weather').addEventListener('click', () => {
        
        // empty out main to prepare for reload
        removePageContent('main');

        // call homePageContent function to populate <main>
        document.querySelector('main').insertAdjacentHTML('afterbegin', weatherPageContent());

        // add active circle to home and remove other two in bottom menubar
        switchActiveMenuIcon('#weather', '#home', '#settings');
    })
}