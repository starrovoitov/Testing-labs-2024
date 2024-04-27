const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const BelitaShopPage = require('./BelitaShopPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test5.log');
    logManager.initialize();

    let browserManager;
    let belitaShopPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        belitaShopPage = new BelitaShopPage(driver);

        await belitaShopPage.open('https://belita-shop.by/katalog/creams-for-face/');

        await belitaShopPage.sortProducts();

        console.log('Товары успешно отсортированы');

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();