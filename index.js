const axios = require('axios');
const fs = require('fs');

const BASE_API_URL = "https://screenshotapi.net/api/v1/";

const formatError = function(error) {
    if (! error.response) {
        return error
    }

    const errors = error.response.data.errors;
    if (! errors) {
        return {
            status: error.response.status,
            message: 'Unknown error occured',
        }
    }

    let errorProperty = errors[Object.keys(errors)[0]];
    if (Array.isArray(errorProperty)) {
        errorProperty = errorProperty[0];
    }

    return {
        status: error.response.status,
        message: errorProperty,
        parameter: errorProperty,
    };
}

let client = {};

/**
 * @typedef {Object} ApiResponse
 * @property {string} screenshot The screenshot url
 * @property {string} url The url of the captured webpage
 * @property {string} created_at The timestamp of the screenshot. Format: YYYY-MM-DD HH:ii:ss
 * @property {boolean} is_fresh If this is a new (fresh) screenshot or a cached screenshot.
 */

/**
 * @param {Object} params The paramaters to call the API with.
 * @param {string} params.url The url to take a screenshot of.
 * @param {int} params.width The width of the browser in pixels. Default value: 1680
 * @param {int} params.height The height of the browser in pixels. Default value: 876
 * @param {boolean} params.full_page If true a screenshot of the entire webpage will be made. Default value: false
 * @param {boolean} params.fresh If true this will force a fresh screenshot (instead of a cached screenshot). Default value: false
 * @param {int} params.thumbnail_width The width of the output image, the aspect ratio will be preserved. If not set then the browser width is used.
 * @param {int} params.delay How many milliseconds to wait before taking the screenshot.
 * @param {string} params.accept_languages The accept languages header to set. Default value: 'en-US,en;q=0.8'
 * @param {string} params.user_agent The user agent string to set.
 * @param {int} params.ttl How many seconds the screenshot should be cached. Default is 30 days.
 * @param {string} params.css_url A specific CSS stylesheet URL to inject in the page.
 * @param {string} params.css CSS code to inject in the page.
 * @param {string} params.selector A Selector that will search for a DOM element. If the element is found a screenshot of that element is returned.
 *
 * @returns {Promise<ApiResponse>}
 */
client.getURLOfScreenshot = async function(params) {
    try {
        const response = await axios.post(`${BASE_API_URL}screenshot`, {
            ...params,
            output: 'json',
            token: client.token,
        });

        return response.data;
    } catch(error) {
        throw formatError(error);
    }
};

/**
 * @param {Object} params The paramaters to call the API with.
 * @param {string} params.url The url to take a screenshot of.
 * @param {int} params.width The width of the browser in pixels. Default value: 1680
 * @param {int} params.height The height of the browser in pixels. Default value: 876
 * @param {boolean} params.full_page If true a screenshot of the entire webpage will be made. Default value: false
 * @param {boolean} params.fresh If true this will force a fresh screenshot (instead of a cached screenshot). Default value: false
 * @param {int} params.thumbnail_width The width of the output image, the aspect ratio will be preserved. If not set then the browser width is used.
 * @param {int} params.delay How many milliseconds to wait before taking the screenshot.
 * @param {string} params.accept_languages The accept languages header to set. Default value: 'en-US,en;q=0.8'
 * @param {string} params.user_agent The user agent string to set.
 * @param {int} params.ttl How many seconds the screenshot should be cached. Default is 30 days.
 * @param {string} params.css_url A specific CSS stylesheet URL to inject in the page.
 * @param {string} params.css CSS code to inject in the page.
 * @param {string} params.selector A Selector that will search for a DOM element. If the element is found a screenshot of that element is returned.
 *
 * @returns {Promise<ApiResponse>}
 */
client.getBinaryDataOfScreenshot = async function(params) {
    try {
        const response = await axios.post(`${BASE_API_URL}screenshot`, {
            ...params,
            output: 'image',
            token: client.token,
        });

        return response.data;
    } catch(error) {
        throw formatError(error);
    }
};

/**
 * @param {string} imagePath Where to save the image.
 * @param {Object} params The paramaters to call the API with.
 * @param {string} params.url The url to take a screenshot of.
 * @param {int} params.width The width of the browser in pixels. Default value: 1680
 * @param {int} params.height The height of the browser in pixels. Default value: 876
 * @param {boolean} params.full_page If true a screenshot of the entire webpage will be made. Default value: false
 * @param {boolean} params.fresh If true this will force a fresh screenshot (instead of a cached screenshot). Default value: false
 * @param {int} params.thumbnail_width The width of the output image, the aspect ratio will be preserved. If not set then the browser width is used.
 * @param {int} params.delay How many milliseconds to wait before taking the screenshot.
 * @param {string} params.accept_languages The accept languages header to set. Default value: 'en-US,en;q=0.8'
 * @param {string} params.user_agent The user agent string to set.
 * @param {int} params.ttl How many seconds the screenshot should be cached. Default is 30 days.
 * @param {string} params.css_url A specific CSS stylesheet URL to inject in the page.
 * @param {string} params.css CSS code to inject in the page.
 * @param {string} params.selector A Selector that will search for a DOM element. If the element is found a screenshot of that element is returned.
 */
client.saveScreenshotToImage = async function(imagePath, params) {
    try {
        const response = await axios.post(`${BASE_API_URL}screenshot`, {
            ...params,
            output: 'image',
            token: client.token,
        }, {
            responseType: 'stream'
        });

        const dest = fs.createWriteStream(imagePath);
        response.data.pipe(dest)
    } catch(error) {
        throw formatError(error);
    }
};

module.exports = function(apiToken) {
    client.token = apiToken;
    return client;
};
