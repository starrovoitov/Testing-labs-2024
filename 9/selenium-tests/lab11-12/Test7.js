const {Builder, By, Key} = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const BelitaShopPage = require('./BelitaShopPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test7.log');
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

        const newQuantity = 15000;

        await belitaShopPage.setQuantity(newQuantity);
        const maxQuantity = await belitaShopPage.getMaxQuantity();

        await belitaShopPage.waitSeconds(2);
        await belitaShopPage.clickBasketOnHeader();

        await belitaShopPage.waitSeconds(2);

        const updatedQuantity = await belitaShopPage.getUpdatedQuantity();

        assert.strictEqual(updatedQuantity, maxQuantity, `Ожидаемое количество: ${maxQuantity}, Фактическое количество: ${updatedQuantity}`);

        console.log("Ожидаемое количество: " + maxQuantity + ". Фактическое количество: " + updatedQuantity);
    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();