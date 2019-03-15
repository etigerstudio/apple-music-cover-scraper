let Crawler = require("crawler");

let scrape = (uri, size, onDone) => {
    let popLast = (str, separator) => {
        let segs = str.split(separator);
        segs.pop();
        return segs.join(separator);
    };

    let artOfSize = (src, size) =>
        `${popLast(src, "/")}/${size.toString()}x0w.jpg`;

    let c = new Crawler({
        callback : function (error, res, done) {
            let art;
            if (error) {
                console.log(error);
                done();
            } else {
                let $ = res.$;
                art = $(".product-hero img").attr("src");
                title = $(".product-header__title").text()
                onDone(artOfSize(art, size), title);
                done();
            }
        }
    });
    c.queue(uri);
};

module.exports = {scrape};
