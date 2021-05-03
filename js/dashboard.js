const formTime = (date, format) => {
    let hours = date.getHours(),
        minutes = date.getMinutes(),
        ampm = "";
        if (format !== "24") {
            hours = hours % 12;
            hours = hours ? hours : 12;
            ampm = hours >= 12 ? 'PM' : 'AM';
        }
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    return [hours, minutes, ampm];
}

const formDate = (date) => {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return [month, day];
}

$(document).ready(function() {
    let urls = {
        "google": "https://google.com/search",
        "bing": "https://bing.com/search",
        "duckduckgo": "https://duckduckgo.com/"
    }

    getStorage("theme", data => setTheme(data)); // Set the theme
    
    getStorage("engine", data => $("#searcher").attr("action", urls[data])); // Set engine

    getStorage("customLinks", cl => {
        if (!cl) { // If no custom links
            chrome.topSites.get(data => {
                for (let i = 0; i < 4; i++)
                $("#topSites").append(`<div class="col"><div class="card py-3"><a href="${data[i].url}"><img src="https://www.google.com/s2/favicons?domain=${data[i].url}"/></a></div></div>`)
            })
        } else { // If custom links
            getStorage("customLinksList", data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].trim() !== "") {
                        $("#topSites").append(`<div class="col"><div class="card py-3"><a href="${data[i]}"><img src="https://www.google.com/s2/favicons?domain=${data[i]}"/></a></div></div>`)
                    } 
                }
                
            })
        }
    })

    getStorage("customWallpaper", cw => {
        if (!cw) {
            $("body").css("background-image", "");
        } else {
            getStorage("customWallpaperImage", data => {
                $("body").css("background-image", `url(${data})`);
            });
        }
    })

    let date = formDate(new Date())
    $("#todaysdate").html(`<span class="text-primary">${date[0]}</span><span class="text-secondary">/${date[1]}</span>`);

    getStorage("format", data => { // Set Time
        let time = formTime(new Date(), data)
        $("#time").html(`<span class="text-primary">${time[0]}</span><span class="text-secondary">:${time[1]}</span><small class="text-primary">${time[2]}</small>`)
        setInterval(() => {
            time = formTime(new Date(), data)
            $("#time").html(`<span class="text-primary">${time[0]}</span><span class="text-secondary">:${time[1]}</span><small class="text-primary">${time[2]}</small>`)
        }, 600)
    })

    // Personalizations
    getStorage("showDate", data => {
        if (!data) {
            $("#todaysdate").addClass("d-none");
        } else {
            $("#todaysdate").removeClass("d-none");
        }
    })

    getStorage("showGreeting", data => {
        if (!data) {
            $("#greeting").addClass("d-none");
        } else {
            $("#greeting").removeClass("d-none");
        }
    })

    // D
    let greetTime = new Date();
    getStorage("name", data => {
        if (greetTime.getHours() < 17) {
            $("#greeting").html(`Have a great day${data ? ", " + data : ""}!`);
        } else {
            $("#greeting").html(`Good Evening${data ? ", " + data : ""}.`)
        }
        
    });
})
