chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openWindow") {
        chrome.windows.create({url: "popup.html", type: "popup", width: 400, height: 400});
    }
});
