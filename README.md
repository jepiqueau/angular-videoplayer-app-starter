<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">Ionic/Angular VideoPlayer App Starter</h3>
<p align="center"><strong><code>angular-sqlite-app-starter</code></strong></p>
<p align="center">Ionic/Angular application demonstrating the use of the</p>
<p align="center"><strong><code>capacitor-video-player</code></strong></p>
<br>
<p align="center"><strong><code>this app uses Capacitor 4</code></strong></p>
<br>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2022?style=flat-square" />
  <a href="https://github.com/jepiqueau/angular-videoplayer-app-starter"><img src="https://img.shields.io/github/license/jepiqueau/angular-videoplayer-app-starter?style=flat-square" /></a>
  <a href="https://github.com/jepiqueau/angular-video-app-starter"><img src="https://img.shields.io/github/package-json/v/jepiqueau/angular-videoplayer-app-starter/master?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

To start clone the project
```bash
git clone https://github.com/jepiqueau/angular-videoplayer-app-starter.git 
cd angular-videoplayer-app-starter
git remote rm origin
npm install
```

To install the latest release of the `capacitor-video-player` plugin.

```bash
npm run update
npx cap update
npm run build
npx cap copy
npx cap copy web
```

## Running the app

### BROWSER

```
npx cap serve
```

### IOS

```
npx cap open ios
```

### ANDROID

```
npx cap open android
```

### ELECTRON

You must update the electron/src/setup.ts as followed:

```
...
        'Content-Security-Policy': [
          electronIsDev
            ? `default-src ${customScheme}://* 'unsafe-inline' devtools://* 'unsafe-eval' data:;
            media-src ${customScheme}: https://* blob: data:; connect-src ${customScheme}: https://* http://www.w3.org/2000/svg data:; worker-src blob:`
            : `default-src ${customScheme}://* 'unsafe-inline' data:`,
        ],
...
```


```
npx cap open @capacitor-community/electron
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/angular-videoplayer-app-starter/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

