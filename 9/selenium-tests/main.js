const {Builder, By, Key, until} = require('selenium-webdriver');

(async function belitaShopTest() {
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		await driver.manage().window().maximize();
		await driver.get('https://belita-shop.by');

		await driver.findElement(By.className('form-control')).sendKeys('Шампунь', Key.RETURN);

		await driver.wait(until.elementLocated(By.className('catalog-item')), 10000);

		const product = await driver.findElement(By.className('search_info'));
		const text = await product.getText();
		console.log(text);

	} finally {
		await driver.quit();
	}
})();
