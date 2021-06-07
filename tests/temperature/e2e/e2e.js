const puppeteer = require('puppeteer');

(async () => {
    try {
        //Inicio de los test
        const browser = await puppeteer.launch();
        console.log("Browser opened.");

        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        console.log("Page opened!");
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking a screenshot")
        await page.screenshot({ path: 'tests/temperature/e2e/01.png', fullPage: true });

        // ================== Fronted temperature ==================
        await page.goto('https://sos2021-21.herokuapp.com/#/temperature');
        await page.click("body > main > main > button.btn.btn-danger");
        console.log("Clicked on delete data");
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking a screenshot")
        await page.screenshot({ path: 'tests/temperature/e2e/02.png', fullPage: true });
        console.log("Loading initial data")

        await page.click("body > main > main > button.btn.btn-success");
        console.log("Initial data loaded")
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking a screenshot")

        const rowCount = (await page.$$("body > main > main > div.table-responsive > table > tbody > tr:nth-child(2)")).length;
        console.log("There are " + rowCount + " rows");

        console.log("Looking for temperature 2010")
        await page.$eval('#findYearInput', el => el.value = '2010');
        await page.waitForTimeout(100);
        await page.click('body > main > main > table > tr > td:nth-child(6) > button');
        console.log("Clicked on search button")
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking screenshot")
        await page.screenshot({ path: 'tests/temperature/e2e/03.png', fullPage: true });

        console.log("Looking for more information about a temperature")
        await page.click("body > main > main > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(1) > a")
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking screenshot")
        await page.screenshot({ path: 'tests/temperature/e2e/04.png', fullPage: true });


        console.log("Visiting integration 1...")
        await page.goto('https://sos2021-21.herokuapp.com/#/integrations/FoodConsumptionGraph');
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking screenthot")
        await page.screenshot({ path: 'tests/temperature/e2e/05.png', fullPage: true });

        console.log("Visiting integration 2...")
        await page.goto('https://sos2021-21.herokuapp.com/#/integrations/countiescovidGraph');
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking screenthot")
        await page.screenshot({ path: 'tests/temperature/e2e/06.png', fullPage: true });

        console.log("Visiting integration 3...")
        await page.goto('https://sos2021-21.herokuapp.com/#/integrations/grymsGraph');
        await page.waitForTimeout(1000);
        console.log("Timeout! Taking screenthot")
        await page.screenshot({ path: 'tests/temperature/e2e/07.png', fullPage: true });

        console.log("All tests have finished!")

        await browser.close();
        console.log("Browser closed!");

    }
    catch (error) {
        await browser.close();
        console.log("Browser closed!");
    }
})();