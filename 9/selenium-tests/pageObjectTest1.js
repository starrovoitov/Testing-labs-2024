const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

class BelitaShopPage {
    constructor(driver) {
        this.driver = driver;
        this.searchInput = By.className('form-control');
        this.catalogItem = By.className('catalog-item');
        this.searchInfo = By.className('search_info');
    }

    async open() {
        await this.driver.manage().window().maximize();
        await this.driver.get('https://belita-shop.by');
    }

    async searchProduct(productName) {
        const searchInput = await this.driver.findElement(this.searchInput);
        await searchInput.sendKeys(productName, Key.RETURN);
    }

    async waitForCatalogItem() {
        await this.driver.wait(until.elementLocated(this.catalogItem), 10000);
    }

    async getProductInfo() {
        const product = await this.driver.findElement(this.searchInfo);
        return await product.getText();
    }
}

(async function belitaShopTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    const belitaShopPage = new BelitaShopPage(driver);

    try {
        await belitaShopPage.open();
        await belitaShopPage.searchProduct('Шампунь');
        await belitaShopPage.waitForCatalogItem();

        const productInfo = await belitaShopPage.getProductInfo();

        assert.strictEqual(typeof productInfo, 'string');

        console.log(productInfo);

    } finally {
        await driver.quit();
    }
})();
