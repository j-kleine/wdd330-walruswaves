import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";

function weatherPageContent() {
    return `
    <h2 class="home-hero"><span>W&W</span><span>DISPLAY</span></h2>
    <div id="location-seeker">
        <label>
            <select name="" id="plunge-select" title="Find your plunge location!">
                <option class="option-disabled" value="" disabled="" selected="">YOUR LOCATION</option>
                <option value="">Espergærde</option>
                <option value="">Jammerbugten</option>
                <option value="">Schausende</option>
            </select>
        </label>
    </div>`
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