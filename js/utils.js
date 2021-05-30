const setStorage = (key, value) => {
    chrome.storage.local.set({[key]: value})
}

const getStorage = (key, callback) => {
    chrome.storage.local.get([key], (data) => {
        callback(data[key])
    })
}

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
}