/* TODO put the declarations bellow into settings.json */
var language = "en";
var jsFiles = ["languages.js", "themes.js", "tabs.js"];
var themes = ["light", "dark"];
var activeTheme = 1;
var activeTabId = 0;
var strings;

addJsFilesToHeader(jsFiles);

window.addEventListener("load", function() {
    strings = loadLanguage(language);
    //loadTheme(); // Causes flickering
    setActiveTab(activeTabId);
});

function addJsFilesToHeader(files) {
    for (let i = 0; i < files.length; i++) {
        let js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "js/" + files[i];
        document.head.appendChild(js);
    }
}
