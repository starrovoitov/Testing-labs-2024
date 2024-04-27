const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const Page = require('./Page');

class BelitaShopPage extends Page {
    constructor(driver) {
        super(driver);
        this.searchInput = By.className('form-control');
        this.catalogItem = By.className('catalog-item');
        this.searchInfo = By.className('search_info');
    }

    async open() {
        await super.open('https://belita-shop.by');
    }

    async searchProduct(productName) {
        const searchInput = await this.findElement(this.searchInput);
        await searchInput.sendKeys(productName, Key.RETURN);
    }

    async waitForCatalogItem() {
        await this.waitUntilLocated(this.catalogItem, 10000);
    }

    async getProductInfo() {
        const product = await this.findElement(this.searchInfo);
        return await product.getText();
    }
}

(async function belitaShopTest() {
    const logManager = new LogManager('./test1.log');
    logManager.initialize();

    let browserManager;
    let belitaShopPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        belitaShopPage = new BelitaShopPage(driver);

        await belitaShopPage.open();
        await belitaShopPage.searchProduct('Шампунь');
        await belitaShopPage.waitForCatalogItem();

        const productInfo = await belitaShopPage.getProductInfo();

        assert.strictEqual(typeof productInfo, 'string');

        console.log(productInfo);

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();
