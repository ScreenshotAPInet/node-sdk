# ScreenshotAPI.net REST API for Node.js

This repository contains the open source Node.js client for [ScreenshotAPI.net](https://screenshotapi.net)

## Requirements
- [Sign up](https://screenshotapi.net/register) for a free ScreenshotAPI.net account
- Copy your API Token from the dashboard

## Installation
```
npm install screenshotapi.net
```

## Usage

To create a new client use the following code.

```js
const screenshotApiClient = require('screenshotapi.net')('YOUR_API_TOKEN')
```

Don't forget to replace `YOUR_API_TOKEN` with your token.


### Saving a screenshot to a file

The following example will save a screenshot to the `output-image.png` file.

```js
screenshotApiClient.saveScreenshotToImage("./output-image.png", {
    url: 'https://npmjs.com',
    fresh: true,
    width: 1920,
    height: 1080,
})
    .then(() => {
        console.log("Screenshot saved!");
    })
    .catch((error) => {
        console.log("Error while getting screenshot.");
        console.dir(error);
    })
```

### Getting the URL of a screenshot

You can also save the screenshot in the cloud and get an url, like so:

```js
screenshotApiClient.getURLOfScreenshot({
    url: 'https://npmjs.com',
    fresh: true,
    width: 1920,
    height: 1080,
})
    .then((result) => {
        console.log(`The screenshot can be found at ${result.screenshot}`);
    })
    .catch((error) => {
        console.log("Error while getting screenshot.");
        console.dir(error);
    })
```

### Documentation
The complete documentation can be found at:
[screenshotapi.net/documentation](https://screenshotapi.net/documentation)
