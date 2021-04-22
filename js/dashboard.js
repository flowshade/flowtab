$(document).ready(function() {
    chrome.storage.local.get(["user"], function(data) {
        document.documentElement.setAttribute("data-theme", JSON.parse(data.user).theme);
        $("#greeting").html(`Good Day, ${JSON.parse(data.user).name}`)
    });

    const formTime = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return [hours, minutes, ampm];
    }

    const formDate = (date) => {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return [month, day];
    }

    chrome.topSites.get(data => {
        for (let i = 0; i < 4; i++) {
            $("#topSites").append(`<div class="col-md">
            <div class="card py-3"><a href="${data[i].url}"><img src="https://www.google.com/s2/favicons?sz=16&domain_url=${data[i].url}"/></a></div>
        </div>
        `)
        }
    })

    let date = formDate(new Date())
    $("#todaysdate").html(`<span class="text-primary">${date[0]}</span><span class="text-secondary">/${date[1]}</span>`);

    setInterval(() => {
        let time =formTime(new Date())
        $("#time").html(`<span class="text-primary">${time[0]}</span><span class="text-secondary">:${time[1]}</span><small class="text-primary">${time[2]}</small>`)
    }, 600)
})
