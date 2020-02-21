// TODO make it private
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
function loadLanguage(language) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "strings/values-" + language + ".xml");
    xhr.overrideMimeType("text/xml");
    xhr.onload = function() {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let strings = xhr.responseXML;
            updateElementsWithStrings(displayedElements, strings);
            updateElementsWithStrings(templatesElements, strings);
        }
    };
    xhr.send();
}
