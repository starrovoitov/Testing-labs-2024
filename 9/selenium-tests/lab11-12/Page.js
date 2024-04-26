const { By, until } = require('selenium-webdriver');

class Page {
    constructor(driver) {
        this.driver = driver;
    }

    async open(url) {
        await this.driver.manage().window().maximize();
        await this.driver.get(url);
    }

    async findElement(locator) {
        return await this.driver.findElement(locator);
    }

    async waitUntilLocated(locator, timeout) {
        await this.driver.wait(until.elementLocated(locator), timeout);
    }
}

module.exports = Page;
