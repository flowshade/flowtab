let themeSwitch = document.getElementById("theme");
let timeSwitch = document.getElementById("time");

// themeSwitch.addEventListener("change", (e) => {
//     console.log(e);
// })

chrome.storage.local.get(["theme"], function(data) {
    let theme = data.theme;
    console.log(theme)
    theme == "dark" ? themeSwitch.setAttribute("checked", "true") : themeSwitch.setAttribute("checked", "false")
    document.documentElement.setAttribute("data-theme", theme);
});

themeSwitch.addEventListener("change", (e) => {
    if (themeSwitch.getAttribute("checked") == "true") {
        themeSwitch.setAttribute("checked", "false");
        chrome.storage.local.set({"theme": "light"}, () => {
            document.documentElement.setAttribute("data-theme", "light");
        })
    } else {
        themeSwitch.setAttribute("checked", "true");
        chrome.storage.local.set({"theme": "dark"}, () => {
            document.documentElement.setAttribute("data-theme", "dark");
        })
    }
})