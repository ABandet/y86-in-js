/* TODO put the declarations bellow into settings.json */
var themes = ["light", "dark"];
var activeTheme = 1;
var activeTabId = 0;
var displayedElements = document.getElementsByClassName("string");
var templatesElements = [];

// We use a function here to restrict the scope of some variables
(function() {
    let VIEWS_IDENTIFIER = "tmpl_";
    let scriptsElements = document.getElementsByTagName("script");
    for (let i = 0; i < scriptsElements.length; i++) {
        if (scriptsElements[i].id.startsWith(VIEWS_IDENTIFIER)) {
            templatesElements.push(scriptsElements[i]);
        }
    }
    console.log(templatesElements);
});

loadLanguage("en");
window.onload = function() {
    //loadTheme(); // TODO restore this behaviour by loading from setting.json
    setActiveTab(activeTabId);
};
