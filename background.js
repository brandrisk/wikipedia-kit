chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({url: 'settings.html'});
});