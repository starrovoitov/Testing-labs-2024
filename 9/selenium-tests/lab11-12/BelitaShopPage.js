const {By, until, Key} = require('selenium-webdriver');
const Page = require('./Page');

class BelitaShopPage extends Page {
    constructor(driver) {
        super(driver);
        this.cartDeleteButton = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[2]/div/div/div[2]/div[2]/table/tbody/tr/td[5]/div');
        this.addToCartButton = By.xpath('/html/body/div[3]/div/div/div/div[3]/div[2]/div[1]/div/div/div[5]/div/div[2]/div[2]/a');
        this.totalPriceElement = By.css('[data-entity="basket-total-price"]');
    }

    async sendKeys(elementLocator, text) {
        const element = await this.findElement(elementLocator);
        await element.clear();
        await element.sendKeys(text);
    }

    async waitSeconds(seconds) {
        await this.driver.sleep(seconds * 1000);
    }

    async waitForCatalogItem() {
        await this.waitUntilLocated(By.className('catalog-item'), 10000);
    }

    async clickElement(locator) {
        const element = await this.driver.findElement(locator);
        await element.click();
    }

    async clickAddToCart() {
        await this.clickElement(this.addToCartButton);
    }

    async goToCart() {
        await this.driver.get('https://belita-shop.by/personal/cart/');
    }

    async deleteFromCart() {
        await this.clickElement(this.cartDeleteButton);
        await this.driver.sleep(2000);
    }

    async getTotalPrice() {
        const totalPriceElement = await this.findElement(this.totalPriceElement);
        return await totalPriceElement.getAttribute('textContent');
    }

    async goToActionsPage() {
        const actionsButton = By.xpath('/html/body/div[3]/header/div[2]/nav/ul/li[4]');
        await this.clickElement(actionsButton);
    }

    async waitForActionsPage() {
        const actionsPageTitle = By.xpath('//h1[contains(text(), "Акции на белорусскую косметику Белита и Витэкс")]');
        await this.waitUntilLocated(actionsPageTitle, 10000);
    }

    async sortProducts() {
        const sortingDropdown = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[1]/div[2]/div[2]/div[1]/div/div[1]');
        const option = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[1]/div[2]/div[2]/div[1]/div/div[2]/ul/li[2]');

        await this.clickElement(sortingDropdown);

        await this.clickElement(option);
        await this.driver.sleep(3000);
    }

    async selectDisplayOptions(option) {
        const displayOptionsDropdown = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/div/div[1]');
        let liIndex;

        switch (option) {
            case 16:
                liIndex = 1;
                break;
            case 32:
                liIndex = 2;
                break;
            case 64:
                liIndex = 3;
                break;
            default:
                throw new Error(`Неправильное значение option: ${option}`);
        }

        const liElement = By.xpath(`/html/body/div[3]/div/div/article/div[2]/div[2]/div[1]/div[2]/div[2]/div[2]/div/div[2]/ul/li[${liIndex}]`);

        await this.clickElement(displayOptionsDropdown);
        await this.clickElement(liElement);
        await this.driver.sleep(3000);
    }

    async getDisplayedItemsCount() {
        const itemLocator = By.className('col col-lg-3 col-md-4 col-sm-6 col-xs-12');
        const items = await this.driver.findElements(itemLocator);
        return items.length;
    }

    async getMaxQuantity() {
        const maxQuantityText = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[2]/div/div/div[2]/div[2]/table/tbody/tr/td[3]/div[2]/div[2]')
        const maxQuantityTextElement = await this.driver.findElement(maxQuantityText);
        const maxQuantityTextString = await maxQuantityTextElement.getText();
        return parseInt(maxQuantityTextString.split(' ')[0]);
    }

    async setQuantity(quantity) {
        const quantityInputField = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[2]/div/div/div[2]/div[2]/table/tbody/tr/td[3]/div[1]/div[1]/input');
        await this.sendKeys(quantityInputField, quantity);
    }

    async clickBasketOnHeader() {
        const anotherElement = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[2]/div/div/div[1]');
        await this.clickElement(anotherElement);
    }


    async getUpdatedQuantity() {
        const updatedQuantityText = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[2]/div/div/div[2]/div[2]/table/tbody/tr/td[3]/div[2]/div[2]')
        const updatedQuantityTextElement = await this.driver.findElement(updatedQuantityText);
        const updatedQuantityTextString = await updatedQuantityTextElement.getText();
        return parseInt(updatedQuantityTextString.split(' ')[0]);
    }

    async goToCheckout() {
        const checkoutButton = By.xpath('/html/body/div[3]/div/div/article/div[2]/div[2]/div[3]/div/div/div[2]/div/div[3]/button');
        await this.clickElement(checkoutButton);
    }

    async clickNextButtonAndWait(seconds, nextButtonXpath) {
        await this.clickElement(By.xpath(nextButtonXpath));
        await this.waitSeconds(seconds);
    }

    async getElementText(locator) {
        const element = await this.findElement(locator);
        return await element.getText();
    }

}

module.exports = BelitaShopPage;