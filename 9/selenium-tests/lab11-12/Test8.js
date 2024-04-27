const { Builder, By, Key } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const BelitaShopPage = require('./BelitaShopPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test8.log');
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

        await belitaShopPage.goToCheckout();
        await belitaShopPage.clickNextButtonAndWait(2, '/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[4]/div[2]/div[2]/div/a');
        await belitaShopPage.clickNextButtonAndWait(2, '/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[5]/div[2]/div[3]/div/a[2]');
        await belitaShopPage.clickNextButtonAndWait(2, '/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[6]/div[2]/div[3]/div/a[2]');
        await belitaShopPage.clickNextButtonAndWait(2, '/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[8]/div[2]/div[3]/div/a[2]');

        await belitaShopPage.sendKeys(By.xpath('/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[9]/div[2]/div[2]/div/div[4]/div[1]/input'), 'Минск');
        await belitaShopPage.sendKeys(By.xpath('/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[9]/div[2]/div[2]/div/div[5]/div/input'), 'Мазурова');
        await belitaShopPage.sendKeys(By.xpath('/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[9]/div[2]/div[2]/div/div[6]/div/input'), '10000');
        await belitaShopPage.clickElement(By.xpath('/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[9]/div[2]/div[2]/div/div[11]/div/input'));
        await belitaShopPage.waitSeconds(3)

        const errorMessageElement = await driver.findElement(By.xpath('/html/body/div[3]/div/div/article/div[2]/form/div/div[1]/div[9]/div[2]/div[2]/div/div[11]/div/input'));
        const errorMessage = await driver.executeScript("return arguments[0].value", errorMessageElement);

        assert.strictEqual(errorMessage, 'Адрес не найден', `Ожидалось: "Адрес не найден", получено: ${errorMessage}`);

        console.log("Тест пройден успешно")

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();