function loadTheme() {
    document.getElementById("theme").href = "css/themes/" + themes[activeTheme] + ".css";
}

function nextTheme() {
    activeTheme++;
    if (activeTheme >= themes.length) {
        activeTheme = 0;
    }
    loadTheme();
}
