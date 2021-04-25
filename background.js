chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("../pages/setup.html");
    let tab = await chrome.tabs.create({ url });
});