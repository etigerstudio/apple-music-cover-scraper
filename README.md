#  Music Cover Scraper [![npm version](https://badge.fury.io/js/apple-music-cover-scraper.svg)](https://badge.fury.io/js/apple-music-cover-scraper)

<p align="center">
  <img src="https://raw.githubusercontent.com/etigerstudio/apple-music-cover-scraper/master/hero.png" alt="apple-music-cover-scraper hero image" title="apple-music-cover-scraper hero image" width="702" />
</p>

Ever been frustrated by low-resolution, over-compressed, distorted album cover of your favorite track in your music library? Obtain comparatively clear, briliant, original cover image from Apple Music catalog preview page using this scraper.

## Installing

This scraper is distributed on NPM. Type this one-line command to install the scraper:

```
$ npm i -g apple-music-cover-scraper
```

## Usage

The main executable is linked as `am_scraper`:

```
$ am_scraper [<-s|--size> <size>] [-v|--version] [-h|--help] url [file name]
```

The *required* `url` denotes the url to the apple music preview web page.

The *optional* `file name` specifies the file name to save the cover as. *Default*: the album title.

The *optional* `size` sets the expected size(width in pixel) of the cover. *Default*: 800.

Use `version` switch to query the version installed.

Use `help` switch to print help infomation.

## Examples

Scrape the cover of *Flux* from *CN* server & save as `Flux - Single.jpg`(Using original album title):

```
$ am_scraper https://itunes.apple.com/cn/album/flux-single/1453562770
```

Scrape the cover of *Flux* in width of *1024* px from *US* server & save as `cover.jpg`:

```
$ am_scraper -s 1024 https://itunes.apple.com/us/album/flux-single/1453562770 cover.jpg
```

## Notes

Preview pages of certain Apple Music server may not be accessible in certain coutries. For example, preview pages of US server is not available in mainland China.

## Disclaimer

This projected is not affiliated with Apple Music in any way. Apple Music is a trademark of Apple Inc.



> Brought to you with ❤️ by E-Tiger Studio 2019.
