const formTime = (date, format) => {
    let hours = date.getHours(),
        minutes = date.getMinutes(),
        ampm = "";
        if (format !== "24") {
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
        }
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    return [hours, minutes, ampm];
}

const formDate = (date) => {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return [month, day];
}

const isURL = str => {
    let url;
    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }
    return url.protocol === "https:" || url.protocol === "http:";
}

$(document).ready(function() {
    // Add More Links
    $("#addMoreLinks").click(() => {
        $("#customLinks").append(`
        <div class="input-group mt-2">
            <input class="form-control" type="text" placeholder="Link">
            <div class="input-group-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        </div>`)
    })

    // urls
    let urls = {
        "google": "https://google.com/search",
        "bing": "https://bing.com/search",
        "duckduckgo": "https://duckduckgo.com/"
    }

    // Custom Theme
    getStorage("customColor", ct => {
        if (ct) {
            getStorage("customColorValue", data => {
                document.documentElement.style.setProperty('--primary', data);
            })
        }
    });

    getStorage("theme", data => setTheme(data));

    getStorage("engine", data => $("#searcher").attr("action", urls[data])); // Set engine

    getStorage("customLinks", cl => {
        if (!cl) { // If no custom links
            $("#topSites").removeAttr("style")
            chrome.topSites.get(data => {
                for (let i = 0; i < 4; i++) {
                    let hostname = new URL(data[i].url).hostname
                    console.log(hostname)
                $("#topSites").append(`<div class="bookmark d-inline-block rounded" href="${data[i].url}">
                <div class="text-center">
                    <img src="https://icons.duckduckgo.com/ip2/${hostname}.ico" width="22" height="22" class="my-3" />
                </div>
            </div>`)
                }
            })
        } else { // If custom links
            getStorage("customLinksList", data => {
                dataFull = 0;
                data.map(l => {if (l != "") dataFull += 1});

                if (data.length > 4 && dataFull > 4) {
                    $("#topSites").css({
                        "white-space": "nowrap",
                        "width": "416px",
                        "overflow-y": "hidden",
                        "box-sizing": "content-box"
                    })
                }
                for (let i = 0; i < data.length; i++) {
                    if (!isURL(data[i])) {
                        data[i] = "https://" + data[i];
                    }
                    if (data[i].trim() !== "") {
                        let hostname = new URL(data[i]).hostname
                        $("#topSites").append(`<div class="bookmark d-inline-block rounded" href="${data[i]}">
                            <div class="text-center">
                                <img src="https://icons.duckduckgo.com/ip2/${hostname}.ico" width="22" height="22" class="my-3" />
                            </div>
                        </div>`)
                    }
                }
                
            })
        }
    })

    getStorage("customWallpaper", cw => {
        if (!cw) {
            $("body").css("background-image", "");
            document.documentElement.style.setProperty('--secondary', "var(--gray)");
        } else {
            getStorage("theme", data => {
                if (data == "light") {
                    document.documentElement.style.setProperty('--secondary', "var(--light-900)");
                }
            })
            getStorage("customWallpaperImage", data => {
                $("body").css("background-image", `url(${data})`);
            });
        }
    })

    let date = formDate(new Date())
    $("#todaysdate").html(`<span class="text-primary">${date[0]}</span><span class="text-secondary">/${date[1]}</span>`);

    getStorage("format", data => { // Set Time
        let time = formTime(new Date(), data)
        $("#todaystime").html(`<span class="text-primary">${time[0]}</span><span class="text-secondary">:${time[1]}</span><small class="text-primary">${time[2]}</small>`)
        setInterval(() => {
            time = formTime(new Date(), data)
            $("#todaystime").html(`<span class="text-primary">${time[0]}</span><span class="text-secondary">:${time[1]}</span><small class="text-primary">${time[2]}</small>`)
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
            $("#d-greeting").addClass("d-none");
            
        } else {
            $("#d-greeting").removeClass("d-none");
        }
    })


    // D
    let greetTime = new Date();
    getStorage("name", data => {
        if (greetTime.getHours() < 17) {
            $("#d-greeting").text(`Have a great day${data ? ", " + data : ""}!`);
        } else {
            $("#d-greeting").text(`Good Evening${data ? ", " + data : ""}.`)
        }
    });

    $("#customLinks").on("click", "div.input-group-item", function(e) {
        if (e.target.tagName == "svg") {
            $(e.target).parent().parent().remove();
        } else {
            $(e.target).parent().remove();
        }
    })

    $("#topSites").on("click", "div.bookmark", function () {
        location.href = $(this).attr("href")
    })

    let scrollingItem = document.getElementById("topSites");

    window.addEventListener("wheel", function (e) {
        if (e.deltaX === 0) {
            if (e.deltaY > 0) {
                scrollingItem.scrollLeft += 25;
            } else {
                scrollingItem.scrollLeft -= 25;
            }
        }
    });

});