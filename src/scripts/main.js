import { loadHomePage, renderHomePage } from "./homePage.mjs";
import { loadWeatherPage } from "./weatherPage.mjs";
import { loadSettingsPage } from "./settingsPage.mjs";

import { checkStoredUnit } from "./unitSwitcher.mjs";

document.querySelector('main').addEventListener("load", renderHomePage());

loadHomePage();
loadWeatherPage();
loadSettingsPage();

checkStoredUnit('settings-temp');
checkStoredUnit('settings-speed');
checkStoredUnit('settings-length');