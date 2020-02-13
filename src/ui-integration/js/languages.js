/* In Firefox, disable "privacy.file_unique_origin" in about:config when working locally */
function loadLanguage(language) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        dump(xhr.responseXML.documentElement.nodeName);
    }
    xhr.onerror = function() {
        dump("Error while getting XML.");
    }
    xhr.open("GET", "strings/values-" + language + ".xml");
    xhr.responseType = "document";
    xhr.send();
    return xhr;
}

function getString(name) {
    return "";
}
