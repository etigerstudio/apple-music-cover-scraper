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
    .usage("<preview url> [file name to save]")
    .action((_url, _name) => {
        url = _url;
        name = _name;
    });
program.parse(process.argv);

// --- Parse Arguments ---

if (!url) {
    program.outputHelp();
    process.exit(1);
}
name = name ? name : "album_art.jpg";


// --- Perform Scraping ---

// from https://stackoverflow.com/questions/11944932
let download = function(url, dest, cb) {
    let file = fs.createWriteStream(dest);
    let request = https.get(url, res => {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);
        });
    }).on('error', function(err) {
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
};

Scraper.scrape(url, art => {download(art, name, error => {
    if (error) {
        console.log(error)
    }
})});
