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

    getStorage("theme", data => document.documentElement.setAttribute("data-theme", data));
    getStorage("name", data => $("#greeting").html(`Have a great day${data ? ", " + data : ""}!`));
    getStorage("engine", data => $("#searcher").attr("action", urls[data]));

    chrome.topSites.get(data => {
        for (let i = 0; i < 4; i++)
        $("#topSites").append(`<div class="col-md"><div class="card py-3"><a href="${data[i].url}"><img src="https://www.google.com/s2/favicons?sz=16&domain_url=${data[i].url}"/></a></div></div>`)
    })

    let date = formDate(new Date())
    $("#todaysdate").html(`<span class="text-primary">${date[0]}</span><span class="text-secondary">/${date[1]}</span>`);

    getStorage("format", data => {
        let time = formTime(new Date(), data)
        $("#time").html(`<span class="text-primary">${time[0]}</span><span class="text-secondary">:${time[1]}</span><small class="text-primary">${time[2]}</small>`)
        setInterval(() => {
            time = formTime(new Date(), data)
            $("#time").html(`<span class="text-primary">${time[0]}</span><span class="text-secondary">:${time[1]}</span><small class="text-primary">${time[2]}</small>`)
        }, 600)
    })

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
})
