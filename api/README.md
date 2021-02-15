#  Regula Document Reader (Cordova)
Regula Document Reader SDK allows you to read various kinds of identification documents, passports, driving licenses, ID cards, etc. All processing is performed completely _**offline**_ on your device. No any data leaving your device.

You can use native camera to scan the documents or image from gallery for extract all data from it.

This repository contains the source code of the Document Reader API, and the sample application that demonstrates the _**API**_ calls you can use to interact with the Document Reader library.

# Contents
* [How to build demo application](#how-to-build-demo-application)
    * [Troubleshooting license issues](#troubleshooting-license-issues)
* [Documentation](#documentation)
* [Additional information](#additional-information)

## How to build the demo application
1. Get a trial license for demo application at  [licensing.regulaforensics.com](https://licensing.regulaforensics.com/)  (`regula.license`  file).
2. Download or clone current repository using the command `git clone https://github.com/regulaforensics/DocumentReader-Cordova-Plugin.git`.
3. Run the following commands in Terminal:
```bash
$ cd example
$ npm install
$ cordova prepare
```

4. Copy the `regula.license` file to the `example/www` folder.
5. Android:
  * Run `cordova run android` inside `example` folder - this is just one way to run the app. You can also run it directly from within Android Studio.

**Note**: if the gallery doesn't open, check if the following line is presented in the AndroidManifest.xml inside the `application` tag:
`<activity android:label="@string/multi_app_name" android:name="com.synconset.MultiImageChooserActivity" android:theme="@android:style/Theme.Holo.Light" />`

6. iOS:
  * Run `cordova run ios` inside `example` folder - this is just one way to run the app. You can also run it directly from within Xcode.

### Troubleshooting license issues
If you have issues with license verification when running the application, please verify that next is true:
1. The OS, which you use, is specified in the license (e.g., Android and/or iOS).
2. The application (Bundle) ID, which you use, is specified in the license.
3. The license is valid (not expired).
4. The date and time on the device, where you run the application, are valid.
5. You use the latest release version of the Document Reader SDK.
6. You placed the `license` into the correct folder as described [here](#how-to-build-demo-application).

## Documentation
You can find documentation on API [here](https://docs.regulaforensics.com/cordova).

## Additional information
If you have any technical questions, feel free to [contact](mailto:cordova.support@regulaforensics.com) us or create issue [here](https://github.com/regulaforensics/DocumentReader-Cordova-Plugin/issues).

To use our SDK in your own app you need to [purchase](https://pipedrivewebforms.com/form/394a3706041290a04fbd0d18e7d7810f1841159) a commercial license.
