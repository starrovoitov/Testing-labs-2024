const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const BelitaShopPage = require('./BelitaShopPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test6.log');
    logManager.initialize();

    let browserManager;
    let belitaShopPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        belitaShopPage = new BelitaShopPage(driver);

        await belitaShopPage.open('https://belita-shop.by/katalog/creams-for-face/');

        await belitaShopPage.selectDisplayOptions(32);

        const displayedItemsCount = await belitaShopPage.getDisplayedItemsCount();
        assert.strictEqual(displayedItemsCount, 32);
        console.log(displayedItemsCount)

        console.log('Товары успешно отображены в количестве 32');

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
        logManager.close();
    }
})();
