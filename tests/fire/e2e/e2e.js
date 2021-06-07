const puppeteer = require('puppeteer');

(async () => {

    //Inicio de los test
    const browser = await puppeteer.launch();
    console.log("Browser opened.");
    
    const page = await browser.newPage();
    await page.goto('https://sos2021-21.herokuapp.com/');
    console.log("Page opened!");
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking a screenshot")
    await page.screenshot({ path: 'tests/fire/e2e/01.png', fullPage:true});
    
    // ================== Fronted fire ==================
    await page.goto('https://sos2021-21.herokuapp.com/#/fire');
    await page.click("body > main > main > button.btn.btn-danger");
    console.log("Clicked on delete data");
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking a screenshot")
    await page.screenshot({ path: 'tests/fire/e2e/02.png', fullPage:true});
    console.log("Loading initial data")

    await page.click("body > main > main > button.btn.btn-success");
    console.log("Initial data loaded")
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking a screenshot")

    const rowCount = (await page.$$("body > main > main > div.table-responsive > table > tbody > tr")).length;
    console.log("There are "+rowCount+" rows");

    console.log("Looking for fires 2019")
    await page.$eval('#findYearInput', el => el.value = '2019');
    await page.waitForTimeout(100);
    await page.click('body > main > main > table > tr > td:nth-child(6) > button');
    console.log("Clicked on search button")
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking screenshot")
    await page.screenshot({ path: 'tests/fire/e2e/03.png', fullPage:true});

    /*
    console.log("Deleting initial data")
    await page.click("body > main > main > button.btn.btn-danger");
    await page.waitForTimeout(100);
    await page.goto('https://sos2021-21.herokuapp.com/#/fire');
    console.log("Adding new fire")
    await page.$eval('#newCountryInput', el => el.value = 'France');
    await page.waitForTimeout(100);
    await page.$eval('#newYearInput', el => el.value = '2020');
    await page.waitForTimeout(100);
    await page.$eval('#newNfcInput', el => el.value = '280');
    await page.waitForTimeout(100);
    await page.$eval('#newAeeInput', el => el.value = '78');
    await page.waitForTimeout(100);
    await page.$eval('#newNvsInput', el => el.value = '2300');
    await page.waitForTimeout(100);
    await page.screenshot({ path: 'tests/fire/e2e/04-1.png', fullPage:true});
    await page.click('body > main > main > div.table-responsive > table > tbody > tr > td:nth-child(6) > button');
    console.log("Clicked on add button")
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking screenshot")
    */
    console.log("Lookin for more information about a fire")
    await page.click("body > main > main > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(1) > a")
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking screenshot")
    await page.screenshot({ path: 'tests/fire/e2e/04.png', fullPage:true});


    console.log("Visiting integration 1...")
    await page.goto('https://sos2021-21.herokuapp.com/#/integrations/airpollution');
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking screenthot")
    await page.screenshot({ path: 'tests/fire/e2e/05.png', fullPage:true});

    console.log("Visiting integration 2...")
    await page.goto('https://sos2021-21.herokuapp.com/#/integrations/internationaltourisms');
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking screenthot")
    await page.screenshot({ path: 'tests/fire/e2e/06.png', fullPage:true});

    console.log("Visiting integration 3...")
    await page.goto('https://sos2021-21.herokuapp.com/#/integrations/lifestats');
    await page.waitForTimeout(1000);
    console.log("Timeout! Taking screenthot")
    await page.screenshot({ path: 'tests/fire/e2e/07.png', fullPage:true});

    console.log("All tests have finished!")

    await browser.close();
    console.log("Browser closed!");

})();