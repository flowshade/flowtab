let change = (id, key, value1, value2, redirect = true) => {
    $(id).change((e)=> { 
        if($(id).is(':checked')){
            setStorage(key, value1);
        } else {
            setStorage(key, value2);
        }

        if (redirect)
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

    // Populate Custom URL Inputs
    getStorage("customLinksList", data => {
        if (Array.isArray(data)) {
            if (data.length !== 0) {
                for (let i = 0; i <= 4; i++) {
                    $(`#url${i + 1}`).val(data[i]);
                }
            }
        }
    })

    getStorage("name", data => {
        $("#settings-name").val(data)
    })

    getStorage("engine", data => {
        $("#browserSelect").val(data)
    })

    setSwitch("#theme", "theme", "dark");
    setSwitch("#time", "format", "24");
    setSwitch("#date", "showDate", true)
    setSwitch("#greeting", "showGreeting", true)
    setSwitch("#custom", "customLinks", true);

    change("#theme", "theme", "dark", "light");
    change("#time", "format", "24", "12");
    change("#date", "showDate", true, false);
    change("#greeting", "showGreeting", true, false);
    change("#custom", "customLinks", true, false, false);

    $("#moresettings").click(() => {
        chrome.tabs.create({ active: true, url: "/pages/usersettings.html" });
    })

    $("#user-settings-done").click(() => {
        setStorage("customLinksList", [$("#url1").val(), $("#url2").val(), $("#url3").val(), $("#url4").val()])
        setStorage("name", $("#settings-name").val());
        setStorage("engine", $("#browserSelect").val());
        chrome.tabs.create({ active: true, url: "chrome://newtab" });
        window.close();
    })
})