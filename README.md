# Regula Face API (Cordova version)
Face API is a framework that is used for face matching, recognition and liveness detection.

# Contents
* [How to build the demo application](#how-to-build-the-demo-application)
* [How to use offine match](#how-to-use-offine-match)
* [Documentation](#documentation)
* [Additional information](#additional-information)

## How to build the demo application
1. Download or the clone current repository using the command `git clone https://github.com/regulaforensics/cordova-plugin-face-api.git`.
2. Run the following commands within the root directory:
```bash
$ cd example
$ npm install
$ npx jetify
$ cordova prepare
```

3. Android:
  * Run `cordova run android` inside example folder - this is just one way to run the app. You can also run it directly from within Android Studio.

4. iOS:
  * Run `cordova run ios` inside example folder - this is just one way to run the app. You can also run it directly from within Xcode.

## How to use offine match
1. Place a license that supports offline match at `www/regula.license`.
2. Change `android-packageName` and `ios-CFBundleIdentifier` in `config.xml` if required by your license.
3. Run the following commands:
```bash
cordova plugin remove cordova-plugin-face-core
cordova plugin add @regulaforensics/cordova-plugin-face-core-match
cordova prepare
```
4. Turn off the internet and run the app.

## Documentation
You can find documentation on API [here](https://docs.regulaforensics.com/develop/face-sdk/mobile).

## Additional information
If you have any technical questions, feel free to [contact](mailto:support@regulaforensics.com) us or create issues [here](https://github.com/regulaforensics/cordova-plugin-face-api/issues).
