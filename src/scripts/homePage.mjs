import { removePageContent, switchActiveMenuIcon } from "./switchPage.mjs";

function homePageContent() {
    return `
    <h2 class="home-hero"><span>Plunge</span><span>With</span><span>Purpose</span></h2>
    <div id="location-seeker" class="home-location-seeker">
        <label>
            <select name="" id="plunge-select" class="home-plunge-select" title="Find your plunge location!">
                <option class="option-disabled" value="" disabled="" selected="">Find your location!</option>
                <option value="">Espergærde</option>
                <option value="">Jammerbugten</option>
                <option value="">Schausende</option>
            </select>
        </label>
    </div>`
}

export function loadHomePage() {
    // insert on first load of website
    document.querySelector('main').insertAdjacentHTML('afterbegin', homePageContent());
    
    // add active circle to home and remove other two in bottom menubar
    switchActiveMenuIcon('#home', '#weather', '#settings');

    // add eventlistener 'click' to home icon
    document.querySelector('#home').addEventListener('click', () => {
        
        // empty out main to prepare for reload
        removePageContent('main');

        // call homePageContent function to populate <main>
        document.querySelector('main').insertAdjacentHTML('afterbegin', homePageContent());

        // add active circle to home and remove other two in bottom menubar
        switchActiveMenuIcon('#home', '#weather', '#settings');
    })
}