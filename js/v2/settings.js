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
        if (Array.isArray(data)) {
            if (data.length !== 0) {
                $("#customLinks").html("")
                for (let i in data) {
                    if (i == 0) {
                        $("#customLinks").append(`
                        <div class="input-group">
                            <input class="form-control" type="text" placeholder="Link" value="${data[i]}">
                            <div class="input-group-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                        </div>`)
                    } else {
                        $("#customLinks").append(`
                        <div class="input-group mt-2">
                            <input class="form-control" type="text" placeholder="Link" value="${data[i]}">
                            <div class="input-group-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                        </div>`)
                    }
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

    getStorage("iconsize", data => {
        $("#iconsize").val(data)
    })

    getStorage("customWallpaperImage", data => {
        $("#customWallpaper").val(data);
    })

    getStorage("customColor", data => {
        if (data) {
            getStorage("customColorValue", data => {
                $("#primary-color").val(data);
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
    setSwitch("#customColor", "customColor", true);

    change("#theme", "theme", "dark", "light");
    change("#time", "format", "24", "12");
    change("#date", "showDate", true, false);
    change("#greeting", "showGreeting", true, false);
    change("#custom", "customLinks", true, false);
    change("#customWall", "customWallpaper", true, false);
    
    // Extension of change function for custom themes
    $("#customColor").change((e)=> { 
        if($("#customColor").is(':checked')){
            setStorage("customColor", true);
            $("#colorSelection").css("display", "block");
        } else {
            setStorage("customColor", false);
            $("#colorSelection").css("display", "none");
        }
    })

    $("#settingsModalSave").click(() => {
        let customLinksArr = []
        $("#customLinks").children().children().each((i, v)=>{
            if ($(v).prop("tagName") == "INPUT") {
                customLinksArr.push($(v).val());
            }
        })
        setStorage("customLinksList", customLinksArr)
        setStorage("customColorValue", $("#primary-color").val());
        setStorage("name", $("#settings-name").val());
        setStorage("engine", $("#browserSelect").val());
        setStorage("iconsize", $("#iconsize").val());
        setStorage("customWallpaperImage", $("#customWallpaper").val());
        chrome.tabs.create({ active: true, url: "chrome://newtab" });
        window.close();
    })
})