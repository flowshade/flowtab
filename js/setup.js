const setup = (form) => {
    $(`#${form}Form`).submit(function(e) {
        e.preventDefault();
        let value = $(this).serializeArray()[0].value;

        setStorage(form, value);
    });
}

$(document).ready(() => {
    const progress = new Progress(".progress");

    $(".next").click(function(e) {
        let section = $(e.target).parent().parent().parent();
        let nextSibling = $(section).next();

        $(section).removeClass("d-flex").addClass("d-none");
        $(nextSibling).removeClass("d-none").addClass("d-flex");

        progress.next();
    });

    setup("name");setup("theme");setup("engine");
    
    // Defaults
    setStorage("format", "12");
    setStorage("showGreeting", true);
    setStorage("showDate", true);
    setStorage("customLinks", false);

    $("#themeSelect").change(function(e) {
        if ($(this).val() === "dark") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    })

});