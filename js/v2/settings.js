let change = (id, key, value1, value2) => {
    $(id).change((e)=> { 
        if($(id).is(':checked')){
            setStorage(key, value1);
        } else {
            setStorage(key, value2);
        }
    })
}

let setSwitch = (id, key, data) => {
    getStorage(key, value => {
        if (value == data) $(id).prop("checked", true);
        else $(id).prop("checked", false);
    })
}

$(document).ready(() => {
    // Populate Custom URL Inputs
    getStorage("customLinksList", data => {
        console.log(data);
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

    getStorage("customWallpaperImage", data => {
        $("#customWallpaper").val(data);
    })

    getStorage("customTheme", data => {
        if (data) {
            $("#theme").attr("disabled", "disabled")
            getStorage("customThemeColors", data => {
                $("#primary-color").val(data[0]);
                $("#secondary-color").val(data[1]);
            })
        } else {
            $("#colorSelection").css("display", "none");
        }
    })

    // Sets the switches accurately based on the "true" values
    setSwitch("#theme", "theme", "dark");
    setSwitch("#time", "format", "24");
    setSwitch("#date", "showDate", true)
    setSwitch("#greeting", "showGreeting", true)
    setSwitch("#custom", "customLinks", true);
    setSwitch("#customWall", "customWallpaper", true);
    setSwitch("#customTheme", "customTheme", true);

    change("#theme", "theme", "dark", "light");
    change("#time", "format", "24", "12");
    change("#date", "showDate", true, false);
    change("#greeting", "showGreeting", true, false);
    change("#custom", "customLinks", true, false);
    change("#customWall", "customWallpaper", true, false);
    
    // Extension of change function for custom themes
    $("#customTheme").change((e)=> { 
        console.log("bro")
        if($("#customTheme").is(':checked')){
            setStorage("customTheme", true);
            $("#theme").attr("disabled", "disabled");
            $("#colorSelection").css("display", "block");
        } else {
            setStorage("customTheme", false);
            console.log("false");
            $("#theme").removeAttr("disabled");
            $("#colorSelection").css("display", "none");
        }
    })

    $("#settingsModalSave").click(() => {
        setStorage("customLinksList", [$("#url1").val(), $("#url2").val(), $("#url3").val(), $("#url4").val()]);
        setStorage("customThemeColors", [$("#primary-color").val(), $("#secondary-color").val()]);
        setStorage("name", $("#settings-name").val());
        setStorage("engine", $("#browserSelect").val());
        setStorage("customWallpaperImage", $("#customWallpaper").val());
        chrome.tabs.create({ active: true, url: "chrome://newtab" });
        window.close();
    })
})