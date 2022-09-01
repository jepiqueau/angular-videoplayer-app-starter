# Ionic/Angular Video Player Application Starter
This is an application to demonstrate the use of the capacitor-video-player plugin in a Ionic/Angular framework.

 -[capacitor-video-player](https://www.npmjs.com/package/capacitor-video-player)


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

Does not work anymore due to a lack of media-src CSP 

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

