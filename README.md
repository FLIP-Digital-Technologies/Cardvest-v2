<div align="center">
    <img src="./react-native-starter-kit.png" width="100%" /> 
</div>

[![License](https://img.shields.io/github/license/IronTony/react-native-react-query-starter-app)](LICENSE)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-screen.svg?style=flat)](#contributors-:sparkles:)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Issues](https://img.shields.io/github/issues/IronTony/react-native-react-query-starter-app.svg)](https://github.com/IronTony/react-native-react-query-starter-app/issues)

<img src="https://img.icons8.com/color/48/000000/travis-ci.png" width="30px" /> [![Build](https://travis-ci.com/IronTony/react-native-react-query-starter-app.svg?branch=master)](https://travis-ci.com/IronTony/react-native-react-query-starter-app)

[![Build](https://img.shields.io/badge/iOS%20Tested-success-brightgreen.svg)](https://github.com/IronTony/react-native-react-query-starter-app)
[![Build](https://img.shields.io/badge/Android%20Tested-success-brightgreen.svg)](https://github.com/IronTony/react-native-react-query-starter-app)

<a href="https://www.buymeacoffee.com/IronTony" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-blue.png" alt="Buy Me A Coffee" width="217px" /></a>

# Table of Contents <!-- omit in toc -->

- [Installation :inbox_tray:](#installation-inbox_tray)
  - [iOS & Android](#ios--android)
- [Environment Setup :globe_with_meridians:](#environment-setup-globe_with_meridians)
- [Scripts :wrench:](#scripts-wrench)
  - [Run the app](#run-the-app)
  - [Generate app icons](#generate-app-icons)
  - [Generate Splashscreen](#generate-splashscreen)
  - [To enabled React-Native (Fabric) new architecture](#to-enabled-react-native-fabric-new-architecture)
  - [Setup iOS](#setup-ios)
  - [Typescript (optional)](#typescript-optional)
- [Roadmap :running:](#roadmap-running)
- [License :scroll:](#license-scroll)

---

## Installation :inbox_tray:

```bash
# Install dependencies
yarn

# Setup iOS development environment
yarn setup:ios

# Start meteor 
yarn start

# To run IOS and Android 

yarn _ios # for IOS 
yarn _android # for Android 

# to Update env Edit the App.json File

# To deploy to App connect for android 

fastlane android bump_badge_deploy_staging

```

## Environment Setup :globe_with_meridians:

`React Native Starter App` environments variables management is based on a custom script and the `app.json` config file.

Define your environment variables inside `app.json` inside the `environments` object under the desired
environment key (such as `development`, `staging` or `production`) and then run the app for the required env
using one of the available run scripts (e.g. `ios:dev`).

If you want to use IDEs such Xcode or Android Studio, you have to set up the ENV variables with these commands:

- `yarn env:dev`, to set the development ENV variables
- `yarn env:stage`, to set the staging ENV variables
- `yarn env:prod`, to set the production ENV variables

---

## Scripts :wrench:

### Run the app

To run the app use one of the following scripts:

- `yarn android:dev`, to start the app on Android with the `development` environment variables.
- `yarn android:stage`, to start the app on Android with the `staging` environment variables.
- `yarn android:prod`, to start the app on Android with the `production` environment variables.

- `yarn ios:dev`, to start the app on iOS with the `development` environment variables.
- `yarn ios:stage`, to start the app on iOS with the `staging` environment variables.
- `yarn ios:prod`, to start the app on iOS with the `production` environment variables.

### Generate app icons

To setup the app icons:

- create an image at least `1024x1024px`
- place it under `/assets` folder as `icon.png`
- run

```sh
yarn assets:icons
```

### Generate Splashscreen

To setup the app splashscreen:

- create an image at least `1242x2208px`
- place it under `/assets` folder as `splashscreen.png`
- run

```sh
yarn assets:splashscreen
```

### To enabled React-Native (Fabric) new architecture

Check the official documentation [here](https://reactnative.dev/docs/new-architecture-intro)

### Setup iOS

To setup the environment to run on iOS, run

```sh
yarn setup:ios
```

this will run `cocoapods` to install all the required dependencies.

### Typescript (optional)

The use of Typescript in the project is not mandatory.
You can just write all your code using plain Javascript.
Our hint is to create all files as below:

- files with logic and Views with `tsx` extension
- files with Stylesheet and others with `ts` extension

To enable full Typescript checks, just open the `tsconfig.json` file and chage as below:<br/>

```
"noImplicitAny": true, // set to true to be explicit and declare all types now<br/>
"strict": true,  // enable it to use fully Typescript set of invasive rules<br/>
```

_REMEMBER: the entry point file in the root of the project MUST be index.js_

---

## Roadmap :running:

✅ Initial Setup<br/>
✅ Splashscreen (https://github.com/crazycodeboy/react-native-splash-screen)<br/>
✅ Toolbox (https://github.com/panz3r/react-native-toolbox)<br/>
✅ Standard tree folders structure<br/>
✅ `React-Native 0.69 (new architecture)`<br/>
✅ `React-query`<br/>
✅ `React-query Custom hooks (eg. GET, POST, PUT, PATCH, DELETE)`<br/>
✅ `React Native Flipper Integration`<br/>
✅ `i18next`<br/>
✅ `React-navigation v6` ❤️<br/>
✅ `Nativebase v3` as design system<br />
✅ `Env` variables selection experimental way ⚗️⚗️⚗️<br />
✅ Typescript (optional use. Read the DOC above)<br />


---


// Node Error especially when using nvm

sudo ln -s "$(which node)" /usr/local/bin/node 

// Error: Graphviz could not be found. Ensure that "gvpr" is in your $PATH. Error: spawn gvpr ENOENT

The error message suggests that Graphviz, specifically the "gvpr" tool, is not found in your system's $PATH. Graphviz is a dependency required for the madge library to generate dependency graphs.


// [CXX1300] CMake '3.18.1' was not found in SDK, PATH, or by cmake.dir property.
[CXX1301] - CMake '3.22.1' found in SDK did not satisfy requested version


Open SDK Manager on Android Studio, Switch to the "SDK Tools" tab in the SDK Manager.
Scroll through the list of SDK Tools until you find "CMake". Check the checkbox next to it to install or update CMake to the latest available version. If the required version is not listed, you can try checking the "Show Package Details" checkbox to see more options.

After selecting the desired CMake version or updating it, click the "Apply" or "OK" button to apply the changes. Android Studio will download and install the selected version of CMake.

