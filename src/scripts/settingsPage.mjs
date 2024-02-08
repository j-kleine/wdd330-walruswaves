import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";

function settingsPageContent() {
    return `
    <h2 class="home-hero"><span>SETTINGS</span><span>PAGE</span></h2>
    <div id="location-seeker">
        <label>
            <select name="" id="plunge-select" title="Find your plunge location!">
                <option class="option-disabled" value="" disabled="" selected="">Find your location!</option>
                <option value="">Espergærde</option>
                <option value="">Jammerbugten</option>
                <option value="">Schausende</option>
            </select>
        </label>
    </div>`
}

export function loadSettingsPage() {
    // add eventlistener 'click' to home icon
    document.querySelector('#settings').addEventListener('click', () => {
        
        // empty out main to prepare for reload
        removePageContent('main');

        // call homePageContent function to populate <main>
        document.querySelector('main').insertAdjacentHTML('afterbegin', settingsPageContent());

        // add active circle to home and remove other two in bottom menubar
        switchActiveMenuIcon('#settings', '#home', '#weather');
    })
}