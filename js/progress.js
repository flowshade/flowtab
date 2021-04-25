const Progress = class {
    constructor (query) {
        this.e = $(query);
        this.element = query;
        this.children = $(`${query} .progress-item`);
        this.progress = 0;
    }
    next () {
        if (this.children[this.progress]) {
            $(this.children[this.progress]).addClass("progress-done")
            this.progress++;
        } else {
            chrome.tabs.create({ active: true, url: "chrome://newtab" });
            window.close();
        }
    }
}