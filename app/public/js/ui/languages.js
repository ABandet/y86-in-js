// TODO remove and implement a proper dropdown selector
function nextLanguage() {
    activeLanguage++;
    if (activeLanguage >= languages.length) {
        activeLanguage = 0;
    }
    loadLanguage(languages[activeLanguage]);
}

//  TODO make it private
function updateElementContent(element, strings) {
    element.textContent = strings.getElementsByTagName(element.id)[0].childNodes[0].nodeValue;
}

// TODO make it private
function updateElementsWithStrings(elements, strings) {
    for (let i = 0; i < elements.length; i++) {
        updateElementContent(elements[i], strings);
    }
}

// TODO make it public
// Loads a new language for the whole UI
function loadLanguage(language) {
    loadLanguageFor(language, document);
}
// TODO make it public
// Loads a new language for the children of a particular element
function loadLanguageForId(language, elementId) {
    loadLanguageFor(language, document.getElementById(elementId));
}
// TODO make it private
function loadLanguageFor(language, parentElement) {
    let xhr = new XMLHttpRequest(),
        displayedElements = parentElement.getElementsByClassName("string");
    xhr.open("GET", "strings/values-" + language + ".xml");
    xhr.overrideMimeType("text/xml");
    xhr.onload = function() {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let strings = xhr.responseXML;
            updateElementsWithStrings(displayedElements, strings);
        }
    };
    xhr.send();
}
