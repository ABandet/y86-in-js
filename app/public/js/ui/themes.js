// TODO make it public (buttons need to call it)
function loadTheme() {
    document.getElementById("theme").href = "css/themes/" + themes[activeTheme] + ".css";
}

// TODO once a better theme switcher widget is implemented, the function bellow will be useless
function nextTheme() {
    activeTheme++;
    if (activeTheme >= themes.length) {
        activeTheme = 0;
    }
    loadTheme();
}
