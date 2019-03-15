let Crawler = require("crawler");

let scrape = (uri, onDone, size=800) => {
    let artOfSize = (src, size) => {
        let segs = src.split("/");
        segs.pop();
        let result = `${segs.join("/")}/${size.toString()}x0w.jpg`;
        return result;
    };

    let c = new Crawler({
        callback : function (error, res, done) {
            let art;
            if(error){
                console.log(error);
                done();
            }else{
                let $ = res.$;
                art = $(".product-hero img").attr("src");
                onDone(artOfSize(art, size));
                done();
            }
        }
    });
    c.queue(uri);
};

module.exports = {scrape};