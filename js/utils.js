const setStorage = (key, value) => {
    chrome.storage.sync.set({[key]: value})
}

const getStorage = (key, callback) => {
    chrome.storage.sync.get([key], (data) => {
        callback(data[key])
    })
}

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
}