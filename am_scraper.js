const Scraper = require("./scraper");
const program = require("commander");
const https = require('https');
const fs = require('fs');

const version = "0.1.0";
let url, name;

// --- Command Config ---

program.version(version, "-v, --version")
    .description("A command line tool to scrape album art from apple music preview page")
    .arguments("<url> [name]")
    .option("-s, --size", "specify the size(width) of the art")
    .usage(`<url> [file name]
  <url>: required, url to the apple music preview web page
  [file name]: optional, file name to save to, default: album title`)
    .action((_url, _name) => {
        url = _url;
        name = _name;
    })
    .on("--help", function() {
        console.log("");
        console.log("Examples:");
        console.log("  $ am_scraper https://itunes.apple.com/cn/album/flux-single/1453562770");
        console.log("  $ am_scraper https://itunes.apple.com/us/album/flux-single/1453562770 cover.jpg");
    });
program.parse(process.argv);

// --- Parse Arguments ---

if (!url) {
    program.outputHelp();
    process.exit(1);
}


// --- Perform Scraping ---

// from https://stackoverflow.com/questions/11944932
let download = function(url, dest, cb) {
    let file = fs.createWriteStream(dest);
    https.get(url, res => {
        res.pipe(file);
        file.on('finish', function() {
            file.close(cb);
        });
    }).on('error', function(err) {
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
};

Scraper.scrape(url, (art, title) => {
    // TODO: slugify title
    download(art, name ? name : `${title}.jpg`, error => {
    if (error) {
        console.log(error)
    }})
});
