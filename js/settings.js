let change = (id, key, value1, value2) => {
    $(id).change((e)=> { 
        if($(id).is(':checked')){
            setStorage(key, value1);
        } else {
            setStorage(key, value2);
        }
        chrome.tabs.create({ active: true, url: "chrome://newtab" });
    })
}

let setSwitch = (id, key, data) => {
    getStorage(key, value => {
        if (value == data) $(id).prop("checked", true);
        else $(id).prop("checked", false);
    })
}

$(document).ready(() => {
    getStorage("theme", data => setTheme(data));

    setSwitch("#theme", "theme", "dark");
    setSwitch("#time", "format", "24");
    setSwitch("#date", "showDate", true)
    setSwitch("#greeting", "showGreeting", true)

    change("#theme", "theme", "dark", "light");
    change("#time", "format", "24", "12");
    change("#date", "showDate", true, false);
    change("#greeting", "showGreeting", true, false);
})