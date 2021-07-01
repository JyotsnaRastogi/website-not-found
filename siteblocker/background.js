function blockUrl(tabId, tabUrl) {
    chrome.storage.local.get('blockedUrls', (result) => {
        const blockedUrls = result.blockedUrls || [];
        for (let i=0; i < blockedUrls.length; i++) {
            if (tabUrl === blockedUrls[i]) {
                chrome.tabs.remove(tabId);
                break;
            }   
        }
    });
}

function whenActiveTab(activeInfo) {
    try {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
           blockUrl(activeInfo.tabId, activeInfo.tabUrl);
        });
    } catch (error) {
        setTimeout(() => whenActiveTab(activeInfo), 500);
    }
}

chrome.tabs.onActivated.addListener((activeInfo) => whenActiveTab(activeInfo));

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url) {
        return;
    }
    blockUrl(tab.id, tab.url);
});
