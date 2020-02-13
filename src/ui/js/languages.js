function changeElementTextContentTo(element, newContent) {
    element.textContent = newContent;
}

function loadLanguage(language) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "strings/values-" + language + ".xml");
    xhr.overrideMimeType("text/xml");
    xhr.onload = function() {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let strings = xhr.responseXML;
            for (let i = 0; i < stringElements.length; i++) {
                let stringNodeList = stringElements[i].childNodes;
                let newStringContent = strings.getElementsByTagName(stringElements[i].id)[0].childNodes[0].nodeValue;
                let done = false;
                for (let j = 0; j < stringNodeList.length; j++) {
                    if (stringNodeList[j].nodeName == "#text") {
                        changeElementTextContentTo(stringNodeList[j], newStringContent);
                        done = true;
                    }
                }
                if (!done) {
                    changeElementTextContentTo(stringElements[i], newStringContent);
                }
            }
        }
    };
    xhr.send();
}
