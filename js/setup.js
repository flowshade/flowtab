let user = {};

$(document).ready(() => {
    const progress = new Progress(".progress");

    $(".next").click(function(e) {
        let section = $(e.target).parent().parent().parent();
        let nextSibling = $(section).next();

        $(section).removeClass("d-flex").addClass("d-none");
        $(nextSibling).removeClass("d-none").addClass("d-flex");

        progress.next();
    });

    $("#nameForm").submit(function(e) {
        e.preventDefault();
        user.name = $(this).serializeArray()[0].value;
    });

    $("#themeForm").submit(function(e) {
        e.preventDefault();
        user.theme = $(this).serializeArray()[0].value;
        
        let userdata = JSON.stringify(user);
        chrome.storage.local.set({"user": userdata}, function() {
            console.log(user);
        });
    });

    $("#themeSelect").change(function(e) {
        if ($(this).val() === "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    })

});