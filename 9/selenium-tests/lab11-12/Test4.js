const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const BelitaShopPage = require('./BelitaShopPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test4.log');
    logManager.initialize();

    let browserManager;
    let belitaShopPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        belitaShopPage = new BelitaShopPage(driver);

        await belitaShopPage.open('https://belita-shop.by');
        await belitaShopPage.waitForCatalogItem();
        await belitaShopPage.clickAddToCart();
        await belitaShopPage.goToCart();
        await belitaShopPage.deleteFromCart();

        const totalPrice = await belitaShopPage.getTotalPrice();

        assert.strictEqual(totalPrice.trim(), '0 руб.');

        console.log('Товар успешно удален из корзины');

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
        logManager.close();
    }
})();
