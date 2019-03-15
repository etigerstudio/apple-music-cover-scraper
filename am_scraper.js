#! /usr/bin/env node

const Scraper = require("./scraper");
const program = require("commander");
const https = require('https');
const fs = require('fs');
const ora = require("ora");

const version = "0.1.0";
let size = 800;
let url, name;

// --- Command Config ---

program.version(version, "-v, --version")
    .description("A command line tool to scrape album cover from apple music preview page")
    .arguments("<url> [name]")
    .option("-s, --size <size>", "specify the size(width) of the art")
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
if (program.size) {
    size = program.size;
}

// --- Init Spinner ---

const scraping = ora("Scraping cover url...");
const downloading = ora("Downloading cover...");

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

scraping.start();
Scraper.scrape(url, size, (art, title) => {
    scraping.succeed("Scraped cover url...");
    downloading.start();

    // TODO: slugify title
    const dest = name ? name : `${title}.jpg`;
    download(art, dest, error => {
    if (error) {
        console.log(error)
    } else {
        downloading.succeed(`Cover saved to ${dest}.`);
    }})
});
