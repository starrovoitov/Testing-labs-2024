const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class BrowserManager {
    constructor() {
    }

    async getDriver(browserName) {
        let driver;
        if (browserName === 'chrome') {
            const options = new chrome.Options();
            driver = await new Builder().forBrowser(browserName).setChromeOptions(options).build();
        } else if (browserName === 'firefox') {
            driver = await new Builder().forBrowser(browserName).build();
        } else {
            throw new Error(`Unsupported browser: ${browserName}`);
        }
        return driver;
    }

    async quit(driver) {
        if (driver) {
            await driver.quit();
        }
    }
}

module.exports = BrowserManager;