import { loadHomePage, renderHomePage } from "./homePage.mjs";
import { loadWeatherPage } from "./weatherPage.mjs";
import { loadSettingsPage } from "./settingsPage.mjs";

renderHomePage();

loadHomePage();
loadWeatherPage();
loadSettingsPage();