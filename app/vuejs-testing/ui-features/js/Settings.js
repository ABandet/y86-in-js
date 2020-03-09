import english from './strings/values-en.js';
import french from './strings/values-fr.js';

var settings = {
  languages: [
    { id: 0, name: "English", strings: english },
    { id: 1, name: "Français", strings: french }
  ],
  themes: [
    { id: 0, name: "Dark", filename: "dark.css" },
    { id: 1, name: "Light", filename: "light.css" }
  ],
  ui: {
    currentTheme: 0,
    currentLanguage: 0,
    currentTab: 0
  }
};
export default settings;
