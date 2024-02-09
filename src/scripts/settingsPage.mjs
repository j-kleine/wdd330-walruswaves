import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";

function settingsPageContent() {
    return `
    <div id="location-seeker" class="weather-location-seeker">
        <label>
            <select name="" id="plunge-select" class="settings-plunge-select" title="Find your plunge location!">
            <option class="option-disabled" value="" disabled="" selected="">Find your location!</option>
                <option value="">Espergærde</option>
                <option value="">Jammerbugten</option>
                <option value="">Schausende</option>
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
    <div id="impressum"><span id="about-link">About</span</div>
    `
}

export function loadSettingsPage() {
    // add eventlistener 'click' to home icon
    document.querySelector('#settings').addEventListener('click', () => {
        // set document title to '... Settings'
        document.title = 'walrusWaves | Settings';
        
        // empty out main to prepare for reload
        removePageContent('main');

        // call homePageContent function to populate <main>
        document.querySelector('main').insertAdjacentHTML('afterbegin', settingsPageContent());

        // add active circle to home and remove other two in bottom menubar
        switchActiveMenuIcon('#settings', '#home', '#weather');
    })
}