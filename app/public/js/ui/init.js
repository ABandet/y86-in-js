/* TODO put the declarations bellow into settings.json */
var themes = ["light", "dark"],
    activeTheme = 1,
    languages = ["en", "fr"],
    activeLanguage = 0,
    activeTabId = 0,
    templatesElements = [];

loadLanguage(languages[activeLanguage]);
window.onload = function() {
    //loadTheme(); // TODO restore this behaviour by loading from setting.json
    setActiveTab(activeTabId);
};
