var Scraper = require("./scraper");

Scraper.scrape("http://itunes.apple.com/cn/album/flux-single/1453562770", art => {console.log(art);});