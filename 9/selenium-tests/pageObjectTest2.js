const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

class BelitaShopPage {
    constructor(driver) {
        this.driver = driver;
        this.cartDeleteButton = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[2]/div/div/div[2]/div[2]/table/tbody/tr/td[5]/div');
        this.AddToCartButton = By.xpath('/html/body/div[3]/div/div/div/div[3]/div[2]/div[1]/div/div/div[7]/div/div[2]/div[2]/a');
        this.totalPriceElement = By.css('[data-entity="basket-total-price"]');
    }

    async open() {
        await this.driver.manage().window().maximize();
        await this.driver.get('https://belita-shop.by');
    }

    async waitForCatalogItem() {
        await this.driver.wait(until.elementLocated(By.className('catalog-item')), 10000);
    }

    async clickAddToCart() {
        const addToCartButton = await this.driver.findElement(this.AddToCartButton);
        await addToCartButton.click();
    }

    async goToCart() {
        await this.driver.get('https://belita-shop.by/personal/cart/');
    }

    async deleteFromCart() {
        const deleteButton = await this.driver.findElement(this.cartDeleteButton);
        await deleteButton.click();
        await this.driver.sleep(2000);
    }

    async getTotalPrice() {
        const totalPriceElement = await this.driver.findElement(this.totalPriceElement);
        return await totalPriceElement.getText();
    }
}

(async function belitaShopTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    const belitaShopPage = new BelitaShopPage(driver);

    try {
        await belitaShopPage.open();
        await belitaShopPage.waitForCatalogItem();
        await belitaShopPage.clickAddToCart();
        await belitaShopPage.goToCart();
        await belitaShopPage.deleteFromCart();

        const totalPrice = await belitaShopPage.getTotalPrice();

        assert.strictEqual(totalPrice.trim(), '0 руб.');

        console.log('Товар успешно удален из корзины, общая стоимость товаров: 0 руб.');

    } finally {
        await driver.quit();
    }
})();
