/* TODO put the declarations bellow into settings.json */
var jsFiles = ["themes.js", "tabs.js"]
var themes = ["light", "dark"];
var activeTheme = 1;
var activeTabId = 0;
var stringElements;

addJsFilesToHeader(jsFiles);
stringElements = document.getElementsByClassName("string");
loadLanguage("en");
window.onload = function() {
    //loadTheme(); // Causes flickering
    setActiveTab(activeTabId);
};

function addJsFilesToHeader(files) {
    for (let i = 0; i < files.length; i++) {
        let js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "js/" + files[i];
        document.head.appendChild(js);
    }
}
