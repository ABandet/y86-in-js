function disableAllButtons(tabId) {
    let i = 0;
    while (document.getElementsByClassName("tab-" + i + "-enabled-button").length > 0) {
        setButtonsDisabledState(i++, true);
    }
}

function enableButtonsOfTab(tabId) {
    setButtonsDisabledState(tabId, false);
}

function setButtonsDisabledState(tabId, state) {
    let buttons = document.getElementsByClassName("tab-" + tabId + "-enabled-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = state;
    }
}

function updateTabsStyle(formerActiveTabId, newActiveTabId) {
    document.getElementById("tab-" + formerActiveTabId + "-button").classList.remove("active-tab-button");
    document.getElementById("tab-" + formerActiveTabId + "-content").classList.remove("active-tab-content");
    document.getElementById("tab-" + newActiveTabId + "-button").classList.add("active-tab-button");
    document.getElementById("tab-" + newActiveTabId + "-content").classList.add("active-tab-content");
}

function setActiveTab(tabId) {
    disableAllButtons();
    enableButtonsOfTab(tabId);
    updateTabsStyle(activeTabId, tabId);
    activeTabId = tabId;
}
